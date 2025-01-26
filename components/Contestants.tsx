import { voteCandidate } from '@/services/blockchain'
import { ContestantStruct, PollStruct, RootState } from '@/utils/types'
import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const Contestants: React.FC<{ contestants: ContestantStruct[]; poll: PollStruct }> = ({
  contestants,
  poll,
}) => {
  return (
    <div className="space-y-2">
      <h1 className="text-center text-[48px] font-[600px]">Contestants</h1>

      <div className="grid grid-cols-1 xl:grid-cols-2 pb-7 gap-[62px] sm:w-2/3 xl:w-11/12 mx-auto">
        {contestants.map((contestant, i) => (
          <Contestant poll={poll} contestant={contestant} key={i} />
        ))}
      </div>
    </div>
  )
}

const Contestant: React.FC<{ contestant: ContestantStruct; poll: PollStruct }> = ({
  contestant,
  poll,
}) => {
  const { wallet } = useSelector((states: RootState) => states.globalStates)

  const voteContestant = async () => {
    if (wallet === '') return toast.warning('Connect wallet first!')
    await toast.promise(
      new Promise<void>((resolve, reject) => {
        voteCandidate(poll.id, contestant.id)
          .then((tx) => {
            console.log(tx)
            resolve(tx)
          })
          .catch((error) => reject(error))
      }),
      {
        pending: 'Approve transaction...',
        success: 'Voted successfully 👌',
        error: 'Encountered error 🤯',
      }
    )
  }

  return (
    <div className="flex justify-start items-center space-x-2 md:space-x-8 mt-5 md:mx-auto">
      <div className="w-[187px] sm:w-[324px] h-[229px] sm:h-[180px] rounded-[24px] overflow-hidden">
        <Image src={contestant.image} alt={contestant.name} width={324} height={180} />
      </div>
      <div className="flex flex-col space-y-2">
        <h2 className="text-[24px] font-[600px]">{contestant.name}</h2>
        <button
          onClick={voteContestant}
          disabled={
            wallet
              ? contestant.voters.includes(wallet) ||
                Date.now() < poll.startsAt ||
                Date.now() >= poll.endsAt
              : true
          }
          className={`w-[158px] sm:w-[213px] h-[48px] rounded-[30.5px] ${
            (wallet && contestant.voters.includes(wallet)) ||
            Date.now() < poll.startsAt ||
            Date.now() >= poll.endsAt
              ? 'bg-[#B0BAC9] cursor-not-allowed'
              : 'bg-[#1B5CFE]'
          }`}
        >
          {wallet && contestant.voters.includes(wallet) ? 'Voted' : 'Vote'}
        </button>
      </div>
    </div>
  )
}

export default Contestants