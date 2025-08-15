import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../services/api'

const fetchMyCellar = () =>
  api.get('/api/wine/my-cellar').then(res => res.data)

export default function MyCellarPage() {
  const [filteredRegion, setFilteredRegion] = useState('')
  const queryClient = useQueryClient()

  
  const {
    data: wines = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['myCellar'],
    queryFn: fetchMyCellar,
  })

 
  const removeMutation = useMutation({
    mutationFn: (wineId) => api.delete(`/api/wine/save/${wineId}`),
    onSuccess: (_data, wineId) => {
      queryClient.setQueryData(
        ['myCellar'],
        (old = []) => old.filter((w) => w._id !== wineId)
      )
    },
  })

  
  const toggleVisibilityMutation = useMutation({
    mutationFn: ({ id, current }) =>
      api.patch(`/api/wine/${id}/visibility`, { public: !current }),
    onSuccess: ({ data: updated }) => {
      // update local cellar list
      queryClient.setQueryData(
        ['myCellar'],
        (old = []) => old.map((w) => (w._id === updated._id ? updated : w))
      )
      // invalidate public list so WineList refetches
      queryClient.invalidateQueries({ queryKey: ['publicWines'] })
    },
  })

  if (isLoading) return <p>Loading your cellar…</p>
  if (isError)
    return <p className="text-red-600">Error: {error.message}</p>

  const uniqueRegions = Array.from(
    new Set(wines.map((w) => w.regionId?.region || 'Unknown'))
  )
  const filteredWines = filteredRegion
    ? wines.filter((w) => w.regionId?.region === filteredRegion)
    : wines

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-6xl mx-auto font-serif">
      <h1 className="text-3xl sm:text-4xl font-semibold mb-8 text-center text-[#4b2e2e] tracking-wide">
        My Wine Cellar
      </h1>

      {/* Filter */}
      <div className="mb-8">
        <label className="block mb-2 text-lg font-medium text-[#5a3d31]">
          Filter by Region:
        </label>
        <select
          className="p-3 border border-[#ccb7a1] bg-[#fdf8f4] text-[#4b2e2e] rounded-lg w-full focus:ring-[#9a6c4a] focus:border-[#9a6c4a]"
          value={filteredRegion}
          onChange={(e) => setFilteredRegion(e.target.value)}
        >
          <option value="">All Regions</option>
          {uniqueRegions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      {filteredWines.length === 0 ? (
        <p className="text-center text-gray-600 italic">
          No wines to display.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWines.map((wine) => (
            <div
              key={wine._id}
              className="bg-[#fffaf5] border border-[#e6d3c5] p-6 rounded-2xl shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between"
            >
              {/* Image */}
              {wine.image ? (
                <img
                  src={wine.image}
                  alt={wine.name}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                  onError={(e) => (e.target.src = '/placeholder.png')}
                />
              ) : (
                <div className="w-full h-48 bg-[#d9cfc4] rounded-xl flex items-center justify-center text-[#a88b7a] italic font-serif mb-4">
                  No image
                </div>
              )}

              {/* Details */}
              <div>
                <h2 className="text-xl font-semibold mb-2 text-[#5a3d31]">
                  {wine.name}
                </h2>
                <p className="text-[#4b2e2e] mb-1">
                  <span className="font-medium">Region:</span> {wine.regionId?.region || 'Unknown'}
                </p>
                <p className="text-[#4b2e2e] mb-1">
                  <span className="font-medium">Grapes:</span> {wine.grapeIds?.map((g) => g.name).join(', ') || 'N/A'}
                </p>
                <p className="text-[#4b2e2e] mb-1">
                  <span className="font-medium">Year:</span> {wine.year}
                </p>
                <p className="text-[#4b2e2e] mb-1">
                  <span className="font-medium">Rating:</span> {wine.rating}/10
                </p>
                <p className="text-[#4b2e2e]">
                  <span className="font-medium">Notes:</span> {wine.notes}
                </p>
              </div>

              {/* Visibility toggle */}
              <label className="mt-4 flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={wine.public}
                  disabled={toggleVisibilityMutation.isLoading}
                  onChange={() =>
                    toggleVisibilityMutation.mutate({
                      id: wine._id,
                      current: wine.public,
                    })
                  }
                  className="form-checkbox h-5 w-5 text-[#800020]"
                />
                <span className="text-[#4b2e2e]">Public</span>
              </label>

              {/* Remove */}
              <button
                onClick={() => removeMutation.mutate(wine._id)}
                disabled={removeMutation.isLoading}
                className="mt-4 bg-[#b03a2e] hover:bg-[#922d23] text-white py-2 px-4 rounded-lg shadow-md transition duration-200 self-start"
              >
                Remove from Cellar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}