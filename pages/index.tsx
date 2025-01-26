import React, { useState, useEffect } from 'react'
import Banner from '@/components/Banner'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Polls from '@/components/Polls'
import { getPolls } from '@/services/blockchain'
import { globalActions } from '@/store/globalSlices'
import { PollStruct, RootState } from '@/utils/types'
import Head from 'next/head'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'

export default function Home({ pollsData }: { pollsData: PollStruct[] }) {
  const dispatch = useDispatch()
  const { setPolls } = globalActions
  const { polls } = useSelector((states: RootState) => states.globalStates)

  useEffect(() => {
    dispatch(setPolls(pollsData))
  }, [dispatch, setPolls, pollsData])

  const [formData, setFormData] = useState({
    fullName: '',
    aadhaarNumber: '',
    voterCardNumber: '',
    mobileNumber: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Add logic to verify Aadhaar and send OTP
    alert('Voter registered successfully!')
    // Redirect to the voting page
    window.location.href = '/vote'
  }

  return (
    <>
      <Head>
        <title>Available Polls</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen relative backdrop-blur">
        <div
          className="absolute inset-0 before:absolute before:inset-0
          before:w-full before:h-full before:bg-[url('/assets/images/bg.jpeg')]
          before:blur-sm before:z-[-1] before:bg-no-repeat before:bg-cover"
        />
        <section className="relative px-5 py-10 space-y-16 text-white sm:p-10">
          <Navbar />
          <Banner />
          <div className="flex justify-center mb-6">
            <Link href="/create-poll" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">
              Create Poll
            </Link>
          </div>
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-black">Voter Form</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-black text-sm font-bold mb-2" htmlFor="fullName">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded text-black"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-black text-sm font-bold mb-2" htmlFor="aadhaarNumber">
                  Aadhaar Number
                </label>
                <input
                  type="text"
                  name="aadhaarNumber"
                  value={formData.aadhaarNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded text-black"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-black text-sm font-bold mb-2" htmlFor="voterCardNumber">
                  Voter Card Number
                </label>
                <input
                  type="text"
                  name="voterCardNumber"
                  value={formData.voterCardNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded text-black"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-black text-sm font-bold mb-2" htmlFor="mobileNumber">
                  Mobile Number
                </label>
                <input
                  type="text"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded text-black"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Register
              </button>
            </form>
          </div>
          <Polls polls={polls} />
          <Footer />
        </section>
      </div>
    </>
  )
}

export const getServerSideProps = async () => {
  const pollsData: PollStruct[] = await getPolls()
  return {
    props: { pollsData: JSON.parse(JSON.stringify(pollsData)) },
  }
}