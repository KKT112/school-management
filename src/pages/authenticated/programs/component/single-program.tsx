import { IProgramData } from '@/model/program';

const SingleProgram = ({imageMain,imageSub,name,desc}:IProgramData) => {
  return (
    <div className='relative'>
       
       <div className='relative mb-10 '>
       <img src={imageMain} className=''/>
       <img src={imageSub} className='absolute  h-20 md:h-25 ml-50 md:ml-90 lg:ml-70  -bottom-10 border-6 right-4 p-2 border-[#FFEFE5] rounded-full bg-green-600'/>
        </div>

        <p className='text-3xl font-bold pb-4'>
            {name}
        </p>
        <p className='text-md text-gray-500 font-semibold pb-10'>
            {desc}
        </p>
    </div>
  )
}

export default SingleProgram;
