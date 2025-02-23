import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="bg-[#0D1117] min-h-screen flex justify-center items-center">
      <SignIn />
    </div>
  )
}