import { useEffect } from 'react'
import { useRouter } from 'next/router'

const VoteIndex = () => {
  const router = useRouter()

  useEffect(() => {
    // Redirect to a specific poll's voting page, e.g., poll with ID 1
    router.push('/vote/1')
  }, [router])

  return null
}

export default VoteIndex