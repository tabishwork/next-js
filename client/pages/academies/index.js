import { deleteAcademy, getAcademies } from '@/apiCalls/academyApiCalls'
import Link from 'next/link'
import React from 'react'

export default function Academies({academies}) {


  async function handleDeleteAcademy(academyId) {
    const response = await deleteAcademy(academyId)
    if (response.success) {
      router.push('/academies'); 
    }
  }

    console.log(academies)
  return (
    <div>
        <Link href="/listAcademy">List Academy</Link>
        {academies.data.map((academy)=>(
        <>
        <div>
            <Link href={`/academyDetails/${academy._id}`} key={academy._id}>{academy.name}</Link>
            </div>
            <button onClick={()=>handleDeleteAcademy(academy._id)}> delete </button>
          </>
        ))}
    </div>
  )
}

export async function getServerSideProps() {
    const academies = await getAcademies()
    console.log(academies)
    return {
      props: {
        academies
      }
    }
  }