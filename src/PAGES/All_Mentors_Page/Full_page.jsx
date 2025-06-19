import React, { useEffect, useState } from 'react'
import Filters_page from '../../Filters/Skills_filter.jsx'
import Mentros_page from './components/mentros_page.jsx'
import "../../STYLES/mentorspage.css"
import { useSearchParams } from 'react-router-dom'
const Full_page = () => {
  const [query, setQuery] = useSearchParams();
  const querySearch = query.get('search')
  const [filters, setFilters] = useState({
      search: "" || querySearch,
      skills: [],
      jobs: "",
      company: "",
    });



  return (
    <div>
      <div className="mentors_page" style={{backgroundColor:"var(--background-color)",marginTop:"130px"}}>
        <Filters_page filters={filters} setFilters={setFilters} setQuery={setQuery}/>
        <Mentros_page filters={filters}/>
      </div>
    </div>
  )
}

export default Full_page