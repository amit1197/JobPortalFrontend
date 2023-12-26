import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

// page & layout imports
import Homepage from './pages/Homepage'
import ReviewDetails from './pages/ReviewDetails'
import Category from './pages/Category'
import SiteHeader from "./components/SiteHeader"

// apollo client
const client = new ApolloClient({
  uri: 'https://genuine-courage-0ad4815806.strapiapp.com/graphql',
  cache: new InMemoryCache()
})

function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
      <div className="App">
        <SiteHeader />
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          
            {/* <Homepage />
          </Route> */}
          <Route path="/details/:id" element={<ReviewDetails />} />
            {/* < />
          </Route> */}
          <Route path="/category/:id" element={<Category />} />
            {/* < />
          </Route> */}
        </Routes>
      </div>
      </ApolloProvider>
    </Router>
  );
}

export default App