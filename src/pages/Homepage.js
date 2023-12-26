import React from 'react'
// import useFetch from '../hooks/useFetch'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'

const REVIEWS = gql`
query {
    reviews(filters: { title: { ne: null } }) {
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

export default function Homepage() {
  //const { loading, error, data } = useFetch('http://localhost:1337/api/reviews')
  const { loading, error, data } = useQuery(REVIEWS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

//   // Ensure data is an array before mapping over it
//   if (!Array.isArray(data)) {
//     console.error('Data is not an array:', data)
//     return null; // or handle the case as appropriate
//   }

  

  console.log(data)

  return (
    <div>
      {data.reviews.data.map(review => (
        <div key={review.id} className="review-card">
          <h2>{review.attributes.title}</h2>
          <div className="rating">{review.attributes.rating}</div>
          {review.attributes.categories.data.map(c => (
            <small key={c.id}>{c.attributes.JobCategory}</small>
          ))}
          <p>{review.attributes.body[0].children[0].text.substring(0, 200)}...</p>
          
          <Link to={`/details/${review.id}`}>Read more</Link>
        </div>
      ))}
    </div>
  )
}