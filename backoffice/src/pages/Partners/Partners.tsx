import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'

const Partners = () => {
    
  return (
    <>
    <Navbar/>
    <div className="flex h-screen">
        <Sidebar/>
        <div className="w-5/6">
            {/* <h1>Contents here</h1> */}
            <div className='flex w-full justify-around'>
              <div className='w-1/5 bg-slate-500 mt-4 p-12 text-center rounded-xl'>
                <p className='text-xl text-white'>College</p>
              </div>

              <div className='w-1/5 bg-slate-500 mt-4 p-12 text-center rounded-xl'>
                <p className='text-xl text-white'>Company</p>
              </div>

              <div className='w-1/5 bg-slate-500 mt-4 p-12 text-center rounded-xl'>
                <p className='text-xl text-white'>Student</p>
              </div>

              <div className='w-1/5 bg-slate-500 mt-4 p-12 text-center rounded-xl'>
                <p className='text-xl text-white'>CC-Ambassador</p>
              </div>
            </div>
        </div>
    </div>
</>
  )
}

export default Partners
