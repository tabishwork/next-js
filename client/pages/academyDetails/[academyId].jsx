import { getAcademyDetails } from '@/apiCalls/academyApiCalls'
import React from 'react'

export default function AcademyDetails({academy}) {
    console.log(academy)
  return (
    <div>{academy.data.name}</div>
  )
}


  export async function getServerSideProps(context) {
    const {params} = context
    console.log(params)
    const academy = await getAcademyDetails(params.academyId)
    console.log(params.academyId)
    return {
      props: {
        academy
      }
    }
  }
