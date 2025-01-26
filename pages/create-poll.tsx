import React, { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { toast } from 'react-toastify'
import { createPoll } from '@/services/blockchain'
import { PollParams } from '@/utils/types'

const CreatePoll = () => {
  const [pollData, setPollData] = useState<PollParams>({
    image: '',
    title: '',
    description: '',
    startsAt: '',
    endsAt: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPollData({ ...pollData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!pollData.image || !pollData.title || !pollData.description || !pollData.startsAt || !pollData.endsAt) {
      return toast.warning('Please fill in all fields')
    }

    pollData.startsAt = new Date(pollData.startsAt).getTime()
    pollData.endsAt = new Date(pollData.endsAt).getTime()

    await toast.promise(
      new Promise<void>((resolve, reject) => {
        createPoll(pollData)
          .then((tx) => {
            console.log(tx)
            resolve(tx)
          })
          .catch((error) => reject(error))
      }),
      {
        pending: 'Approve transaction...',
        success: 'Poll created successfully 👌',
        error: 'Encountered error 🤯',
      }
    )
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen relative backdrop-blur">
        <div
          className="absolute inset-0 before:absolute before:inset-0
          before:w-full before:h-full before:bg-[url('/assets/images/bg.jpeg')]
          before:blur-sm before:z-[-1] before:bg-no-repeat before:bg-cover"
        />
        <section className="relative px-5 py-10 space-y-16 text-white sm:p-10">
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Create Poll</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                  Poll Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={pollData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Description
                </label>
                <textarea
                  name="description"
                  value={pollData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startsAt">
                  Start Date
                </label>
                <input
                  type="datetime-local"
                  name="startsAt"
                  value={pollData.startsAt}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endsAt">
                  End Date
                </label>
                <input
                  type="datetime-local"
                  name="endsAt"
                  value={pollData.endsAt}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                  Banner URL
                </label>
                <input
                  type="url"
                  name="image"
                  value={pollData.image}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Create Poll
              </button>
            </form>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default CreatePoll