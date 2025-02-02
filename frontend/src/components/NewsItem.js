import React from 'react'

const NewsItem =(props)=> {

 
    let {title,description,imageUrl, newsUrl,author,date,source} =props;
    return (
      <div className="my-3">
      <div className="card">
        <div style={{display:'flex',justifyContent:'flex-end',position:'absolute',right:0}}>
        <span className="badge rounded-pill bg-danger" style={{ left: '90%', zIndex: '1' }}>
    {source}
   
  </span>
        </div>
  <img src={imageUrl?imageUrl:"https://thehill.com/wp-content/uploads/sites/2/2024/07/AP24172679018758-e1720523163554.jpg?w=1280"} className="card-img-top" alt="..."/>
  <div className="card-body">
  
    <h5 className="card-title">{title} </h5>
    <p className="card-text">{description}</p>
    <p className="card-text"><small className="text-body-secondary">By {!author?"unknown":author} on {new Date (date).toGMTString()}</small></p>
    <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
  </div>
</div>
      </div>
    )
  }


export default NewsItem