import { useQuery, gql } from '@apollo/client'
import React from 'react'
import { useParams } from 'react-router-dom'
// import useFetch from '../hooks/useFetch'

const REVIEW = gql`
query GetMovieReviews($movieId: ID!) {
    review(id: $movieId) {
      data {
        id
        attributes {
          title
          rating
          body
          categories {
              data {
                  attributes {
                      JobCategory
                  }
              }
          }
        }
      }
    }
  }
`

export default function ReviewDetails() {
  const { id } = useParams()

  const { loading, error, data } = useQuery(REVIEW, {
    variables: { movieId: id }
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  console.log(data)
  
    // Add a null/undefined check
    // if (!data || !data.attributes || Object.keys(data.attributes).length === 0) {
    //     return <p>Loading...</p>; // or handle the loading state as needed
    //   }
    

  console.log(data)

  const { attributes } = data.review.data;
  return (
    <div className="review-card">
      <div className="rating">{attributes.rating}</div>
      <h2>{attributes.title}</h2>
      
      {attributes.categories.data.map(c => (
            <small key={c.id}>{c.attributes.JobCategory}</small>
      ))}

      {attributes.body.map((paragraph, index) => (
        <p key={index}>{paragraph.children[0].text}</p>
      ))}
    </div>
  )
}