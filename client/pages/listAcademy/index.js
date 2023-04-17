import { postAcademy, usePostAcademy } from '@/apiCalls/academyApiCalls';
import React, { useRef } from 'react'

export default function ListAcademy() {

    const { mutate:postAcademyMutate, isLoading:isPostAcademyLoading, isError:isPostAcademyError, error:postAcademyError } = usePostAcademy();


    const nameInputElement = useRef();
    const descriptionInputElement = useRef();
    const websiteInputElement = useRef();
    const phoneInputElement = useRef();
    const emailInputElement = useRef();
    const housingInputElement = useRef();
    const jobAssistanceInputElement = useRef();
    const jobGuranteeInputElement = useRef();
    const acceptGiInputElement = useRef();
    const addressInputElement = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
          name: nameInputElement.current?.value,
          description: descriptionInputElement.current?.value,
          website: websiteInputElement.current?.value,
          phone: phoneInputElement.current?.value,
          email: emailInputElement.current?.value,
          address: addressInputElement.current?.value,
          housing: housingInputElement.current?.checked,
          jobAssistance: jobAssistanceInputElement.current?.checked,
          jobGurantee: jobGuranteeInputElement.current?.checked,
          acceptGi: acceptGiInputElement.current?.checked,
        };
        postAcademyMutate(data)
      };

  return (
    <>
     {isPostAcademyLoading && <h1>....loading</h1>}
    <div className="flex justify-center">
        <div className="flex flex-col w-[600px] mt-20 shadow-lg py-10 mx-8 px-5 lg:px-10 xl:px-10">
            <h1 className="text-2xl font-bold text-center pb-8">List Academy</h1>
            <form action="" className="flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2">
                    <label className="text-xl font-semibold" for="name">Name:</label>
                    <input
                     className="text-lg px-2 py-1 border border-gray-400 rounded-sm"
                      type="text"
                      name="name"
                      ref={nameInputElement}
                      />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-xl font-semibold" for="description">Description:</label>
                    <input
                     className="text-lg px-2 py-1 border border-gray-400 rounded-sm"
                      type="text"
                      name="description"
                      ref={descriptionInputElement}
                      />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-xl font-semibold" for="website">Website:</label>
                    <input
                     className="text-lg px-2 py-1 border border-gray-400 rounded-sm"
                      type="text"
                      name="website"
                      ref={websiteInputElement}
                      />
                </div>
                <div className="flex gap-2">
                    <label className="text-xl font-semibold" for="housing">Housing</label> 
                    <input
                     type="checkbox"
                      name="housing"
                      ref={housingInputElement}
                      />
                
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-xl font-semibold" for="Job-ass">Job Assistance:</label>
                    <input
                     type="checkbox"
                      name="jobAssistance"
                      ref={jobAssistanceInputElement}
                      />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-xl font-semibold" for="Job-GT">Job Guarantee:</label>
                    <input
                     type="checkbox"
                      name="jobGurantee"
                      ref={jobGuranteeInputElement}
                      />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-xl font-semibold" for="acceptG">Accept G:</label>
                    <input
                     type="checkbox"
                      name="acceptGi"
                      ref={acceptGiInputElement}
                      />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-xl font-semibold" for="phone">Phone:</label>
                    <input
                     className="text-lg outline-none"
                      type="text"
                      name="phone"
                      ref={phoneInputElement}
                      />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-xl font-semibold" for="email">Email:</label>
                    <input
                     className="text-lg outline-none"
                     type="text"
                     name="email"
                    ref={emailInputElement}
                      />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-xl font-semibold" for="address">Address:</label>
                    <input className="text-lg outline-none"
                     type="text"
                     name="address"
                     ref={addressInputElement}
                      />
                </div>
                {isPostAcademyError &&
                <div>
                  <p className='text-red-600'>{postAcademyError.message}</p>
                </div>
                }
                <div className="flex justify-center">
                    <button className="px-10 xl:px-20 lg:px-20 py-3 text-sm md:text-lg lg:text-lg xl:text-lg text-white font-semibold rounded-lg bg-[#4a4cc7] hover:bg-[#4647ab]">List</button>
                </div>
            </form>
        </div>
    </div>
    </>
  )
}


 
  