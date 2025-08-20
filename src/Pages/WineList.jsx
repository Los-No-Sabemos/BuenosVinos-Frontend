import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import WineCard from '../components/WineCard'
import Footer from '../components/Footer'

// fetcher for public wines
const fetchPublicWines = () =>
  api.get('/api/wine/public').then(res => res.data)

export default function WineList() {
  const navigate = useNavigate()
  const storedToken = localStorage.getItem('authToken')

  
  const {
    data: wines = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['publicWines'],
    queryFn: fetchPublicWines,
  })

  const handleDelete = async (wineId) => {
    try {
      await api.delete(`/api/wine/${wineId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
    } catch (err) {
      console.error('Error deleting wine:', err)
      alert('Failed to delete wine.')
    }
  }

  const handleEdit = (wine) => {
    navigate(`/wines/${wine._id}/edit`)
  }

  const handleSaveToCellar = async (wineId) => {
    try {
      await api.post(
        `/api/wine/save/${wineId}`,
        null,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      alert('Wine saved to your cellar!')
    } catch (err) {
      console.error('Error saving wine:', err)
      alert('Could not save wine.')
    }
  }

  if (isLoading)
    return <p className="p-6 text-center italic">Loading wines...</p>
  if (isError)
    return (
      <p className="p-6 text-center text-red-600">
        Error: {error.message}
      </p>
    )

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-[#fdf7f2] rounded-xl shadow-inner">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-[#4b2e2e]">
          All Public Wines 
        </h1>

        {wines.length === 0 ? (
          <p className="text-center text-gray-600">
            No public wines found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wines.map((wine) => (
              <WineCard
                key={wine._id}
                wine={wine}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onSave={handleSaveToCellar}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  )
}
