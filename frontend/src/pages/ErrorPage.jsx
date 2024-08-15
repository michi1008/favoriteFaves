import React from "react"
import styled from "styled-components"
import img from "../assets/error.jpg"
const ErrorPage = () => {
  return (
    <Wrapper>
      <div className="errorContainer">
        <div className="errorTitle">
          <h2>Page Not Found</h2>
        </div>
        <div className="errorImgContainer">
          <img className="errorImg" src={img}/>
        </div>
      </div>             
    </Wrapper>
  )
}
const Wrapper = styled.section`
  .errorContainer {
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;     
  }

  .errorTitle {
    color: var(--clr-red);
    margin-top: 1rem;
  }
  
  .errorImgContainer {
    text-align:center;
    display:block;
  }

  .errorImg {
    margin: 0 auto;
    width: 80vw;
    margin-top: 2rem;
  }

`
export default ErrorPage