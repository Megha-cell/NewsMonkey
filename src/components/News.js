
import React,{useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News =(props)=> {
  const [articles, setArticles] = useState([])
    // eslint-disable-next-line 
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  
  //document.title=`${this.capitalizeFirstLetter(props.category)} - NewsMonkey`;

  const capitalizeFirstLetter=(val)=> {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
  
  
  
  const updateNews = async () => {
    try {
      props.setProgress(10);  // Start loading at 10%
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;  
      setLoading(true)  
      let data = await fetch(url);
      props.setProgress(30);  // Set progress to 30% after the fetch request
  
      let parsedData = await data.json();
      props.setProgress(50);  // Set progress to 50% after parsing the data
      setArticles(parsedData.articles || [])
      setTotalResults(parsedData.totalResults)
      setLoading(false)
      
    
  
      props.setProgress(100);
        // Complete the progress
      
    } catch (error) {
      console.error('Error fetching news:', error);
      setArticles([])
      setLoading(false)
      
      props.setProgress(100);
    }
  }
  
  useEffect(() => {
    document.title=`${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    // eslint-disable-next-line 
    updateNews();

  
   } , [])
  
  
    // let url = https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=95c514a64a094ca2af8f55faab84073d&page=1&pageSize=${props.pageSize};    
    // this.setState({ loading: true });  // Set loading to true when data starts fetching
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false // Set loading to false when data is loaded
    // });

   

  // handlePrevClick = async () => {
  //   // let url = https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=95c514a64a094ca2af8f55faab84073d&page=${this.state.page - 1}&pageSize=${props.pageSize};
  //   // this.setState({loading: true});
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json();
  //   // this.setState({
  //   //   page: this.state.page - 1,
  //   //   articles: parsedData.articles,
  //   //   loading:false
  //   // });
  //   this.setState({page:this.state.page-1});
  //   this.updateNews();
  // }

  // handleNextClick = async () => {
  //   if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize))) {
      
    
  //   let url = https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=95c514a64a094ca2af8f55faab84073d&page=${this.state.page + 1}&pageSize=${props.pageSize};
  //   this.setState({loading: true});
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   console.log(parsedData);
  //   this.setState({
  //     page: this.state.page + 1,
  //     articles: parsedData.articles,
  //     loading:false
  //   });
  // }
  // this.setState({page:this.state.page+1});
  // this.updateNews();
  // }
    const fetchMoreData = async() => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    
      
      
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;    
      setPage(page+1)
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticles(articles.concat(parsedData.articles))
      setTotalResults(parsedData.totalResults)
      setLoading(false)
      
      
     
    
  };

  
    return (
      <>
        <h1 className="text-center" style={{margin: '35px 0px',marginTop:'90px'}}>NewsMonkey - Top {capitalizeFirstLetter(props.category )} Headlines</h1>
        {/* {this.state.loading && <Spinner/>} */}
         <InfiniteScroll
          dataLength={articles ? articles.length : 0}
          next={fetchMoreData}
          hasMore={articles && articles.length < totalResults}
          loader={<Spinner/>}>
            <div className="container">
        
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title || ""}
                    description={element.description || ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button 
            disabled={this.state.page <= 1} 
            type="button" 
            className="btn btn-dark" 
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button 
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} 
            type="button" 
            className="btn btn-dark" 
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
        
      </>
    );
  }

News.defaultProps = {
  country:'in',
  pageSize: 8,
  category : 'general'
}
News.propTypes ={
 country: PropTypes.string,
 pageSize: PropTypes.number,
 category: PropTypes.string

}

export default News;