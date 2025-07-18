import React from 'react'
import env from "react-dotenv";
import { useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import StyleSwitcher from '../../components/StyleSwitcher'
import { work1, client01, bg01,getStarted1,getStarted2  } from '../../components/imageImport'
import { useState } from 'react'
import { ethers } from "ethers"
var Buffer = require('buffer/').Buffer


//ipfs authorization 
const ipfsClient = require('ipfs-http-client');
const PROJECT_ID = process.env.REACT_APP_INFURA_PROJECT_ID || "2JxLmbuIpIQxW2x2x7Q2UG5qaLv"
const API_SECRET = process.env.REACT_APP_INFURA_PROJECT_SECRET || "e090f091cad8e0d10abdd17ee55a454e"

const projectId = PROJECT_ID;   // <---------- Infura Project ID

const projectSecret = API_SECRET;  // <---------- Infura Secret


const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = ipfsClient.create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});

const UploadWork = ({marketplace,nft}) => {
  const [image, setImage] = useState('')
  const [price, setPrice] = useState(null)
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [applicances, setAppliances] = useState('')
  const [description, setDescription] = useState('')
  const [bedrooms, setBedrooms] = useState('')
  const [bathrooms, setBathrooms] = useState('')
  const [yearBuilt, setYearBuilt] = useState('')
  const [units, setUnits ] = useState('')
  const [propertyAddress, setPropertyAddress] = useState('')
  const [propertyCity, setPropetyCity] = useState('')
  const [propertyState, setPropertyState] = useState('')
  const [zipCode, setZipCode ] = useState('')
  const [increment, setIncrement] = useState('')
  const [endTime, setEndTime ] = useState('')


   

  const createNFT = async (event) => {
    console.log("price : ",price, "name : ",name, "description : ",description, "image : ",image  )
    event.preventDefault()
    if (
      !image || !price || !name || !description) return
    try{
      const result = await client.add(JSON.stringify({
          image, name, description, bedrooms, bathrooms,
          yearBuilt, units, propertyAddress, propertyCity, 
           propertyState, zipCode, price, increment, endTime
       }))
      mintThenList(result)
    } catch(error) {
      console.log("ipfs uri upload error: ", error)
    }
  }
  const mintThenList = async (result) => {
    const uri = `https://gateway.pinata.cloud/ipfs/${result.path}`
    // mint nft 
    await(await nft.mint(uri)).wait()
    // get tokenId of new nft 
    const id = await nft.tokenCount()
    // approve marketplace to spend nft
    await(await nft.setApprovalForAll(marketplace.address, true)).wait()
    // add nft to marketplace
    const listingPrice = ethers.utils.parseEther(price.toString())
    await(await marketplace.makeItem(nft.address, id, listingPrice)).wait()
    alert("NFT successfully Listed please go to home page")
  }
 

  const uploadToIPFS = async (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    
    if (typeof file !== 'undefined') {
      try {
        const result = await client.add(file)
        console.log(result)
        setImage(`https://gateway.pinata.cloud/ipfs/${result.path}`)
        readFile(file)
      } catch (error){
        console.log("ipfs image upload error: ", error)
      }
    }
  }

  const readFile = uploadedFile => {
    if (uploadedFile) {
      const reader = new FileReader()
      reader.onload = () => {
        const parent = document.querySelector('.preview-box')
        parent.innerHTML = `<img className="preview-content" src=${reader.result} />`
      }

      reader.readAsDataURL(uploadedFile)
    }
  }
 
  return (
    <>
      {/* Navbar */}
      
      {/* Start Home */}
      <section
        className="bg-half-170 d-table w-100"
        style={{ background: `url(${bg01}) bottom` }}
      >
        <div className="bg-overlay bg-gradient-overlay-2"></div>
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-12">
              <div className="title-heading text-center">
                <h5 className="heading fw-semibold sub-heading text-white title-dark">
                  Upload Your NFT
                </h5>
                <p className="text-white-50 para-desc mx-auto mb-0">
                  Add your digital art assets
                </p>
              </div>
            </div>
            {/*end col*/}
          </div>
          {/*end row*/}

          <div className="position-middle-bottom">
            <nav aria-label="breadcrumb" className="d-block">
              <ul
                className="breadcrumb breadcrumb-muted mb-0 p-0"
                style={{ backgroundColor: 'transparent' }}
              >
                <li className="breadcrumb-item">
                  <a
                    href="/"
                    // onClick={e => {
                    //   e.preventDefault()
                    //   navigate('/')
                    // }}
                  >
                    DIGIMINT
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Get Started
                </li>
              </ul>
            </nav>
          </div>
        </div>
        {/*end container*/}
      </section>
      {/*end section*/}
      <div className="position-relative">
        <div className="shape overflow-hidden text-white">
          <svg
            viewBox="0 0 2880 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>
      {/* End Home */}

      {/* Start */}
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-4 order-2 order-md-1 mt-4 pt-2 mt-sm-0 pt-sm-0">
              <div className="card creators creator-primary rounded-md shadow overflow-hidden sticky-bar">
                <div
                  className="py-5"
                  style={{ background: `url(${work1})` }}
                ></div>
                <div className="position-relative mt-n5">
                  <img
                    src={client01}
                    className="avatar avatar-md-md rounded-pill shadow-sm bg-light img-thumbnail mx-auto d-block"
                    alt=""
                  />

                  <div className="content text-center pt-2 p-4">
                    <h6 className="mb-0">Steven Townsend</h6>
                    <small className="text-muted">@StreetBoy</small>

                    <ul className="list-unstyled mb-0 mt-3" id="navmenu-nav">
                      <li className="px-0">
                        <a
                          href="/creator-profile"
                          // onClick={e => {
                          //   e.preventDefault()
                          //   navigate('/creator-profile')
                          // }}
                          className="d-flex align-items-center text-dark"
                        >
                          <span className="fs-6 mb-0">
                            <i className="uil uil-user"></i>
                          </span>
                          <small className="d-block fw-semibold mb-0 ms-2">
                            Profile
                          </small>
                        </a>
                      </li>

                      
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/*end col*/}

            <div className="col-lg-9 col-md-8 order-1 order-md-2">
              <div className="card rounded-md shadow p-4">
                <div className="row">
                  <div className="col-lg-5">
                    <div className="d-grid">
                      <p className="fw-semibold mb-4">
                        Upload your NFT here, Please click "Upload Image"
                        Button.
                      </p>
                      <div className="preview-box d-block justify-content-center rounded-md shadow overflow-hidden bg-light text-muted p-2 text-center small">
                        Supports JPG, PNG and JPEG. Max file size : 10MB.
                      </div>
                      <input
                        type="file"
                        id="input-file"
                        name="input-file"
                        accept="image/*"
                        onChange={uploadToIPFS}
                        hidden
                      />
                      <label
                        className="btn-upload btn btn-primary rounded-md mt-4"
                        htmlFor="input-file"
                      >
                        Upload Image
                      </label>
                    </div>
                  </div>
                  {/*end col*/}

                  <div className="col-lg-7 mt-4 mt-lg-0">
                    <div className="ms-lg-4">
                      <form>
                        <div className="row">
                          <div className="col-12 mb-4">
                            <label className="form-label fw-bold">
                              NFT name <span className="text-danger">*</span>
                            </label>
                            <input
                              name="name"
                              id="name"
                              type="text"
                              className="form-control"
                              placeholder="My First NFT"
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                          {/*end col*/}

                          <div className="col-12 mb-4">
                            <label className="form-label fw-bold">
                              {' '}
                              Description :{' '}
                            </label>
                            <textarea
                              name="comments"
                              id="comments"
                              rows="4"
                              className="form-control"
                              placeholder="My first NFT"
                              onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                          </div>
                          {/*end col*/}


                          <div className="col-md-6 mb-4">
                            <label className="form-label fw-bold">
                              {' '}
                              Price in Eth{' '} <span className="text-danger">*</span>
                            </label>
                            <input
                              name="time"
                              type="number"
                              className="form-control"
                              id="time"
                              defaultValue="40"
                              onChange={(e) => setPrice(e.target.value)}
                            />
                          </div>
                          {/*end col*/}


                          <div className="col-lg-12">
                            <button
                              onClick={createNFT}
                              className="btn btn-primary rounded-md"
                            >
                              Create NFT
                            </button>
                          </div>

                          {/* <button onClick={createNFT}>create nft</button> */}
                          {/*end col*/}
                        </div>
                      </form>
                    </div>
                  </div>
                  {/*end col*/}
                </div>
                {/*end row*/}
              </div>
            </div>
            {/*end col*/}
          </div>
          {/*end row*/}
        </div>
        {/*end container*/}
      </section>
      {/*end section*/}
      {/* End */}

      {/* footer */}
      {/* <Footer /> */}

      {/* Style switcher  */}
      <StyleSwitcher />
    </>
  )
}

export default UploadWork
