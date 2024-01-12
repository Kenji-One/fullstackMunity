const axios = require('axios');
const FormData = require('form-data');
import { ethers } from "ethers"


const key = process.env.PINATA_KEY || ""; 
const secret = process.env.PINATA_SECRET  || ""; 



export const uploadJSONToIPFS = async(JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

    // console.log("JSONBody: ",JSONBody);

    // making axios POST request to Pinata ⬇️
    return axios 
        .post(url, JSONBody, {
            headers: {
                pinata_api_key: key,
                pinata_secret_api_key: secret,
            }
        })
        .then(function (response) {
            console.log(response.data);
           return {
               success: true,
               pinataURL: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
           };
        })
        .catch(function (error) {
            console.log(error)
            return {
                success: false,
                message: error.message,
            }

    });
};

export const uploadFileToIPFS = async(file) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    //making axios POST request to Pinata ⬇️
    
    let data = new FormData();
    data.append('file', file);


    return axios 
        .post(url, data, {
            maxBodyLength: 'Infinity',
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                pinata_api_key: key,
                pinata_secret_api_key: secret,
            }
        })
        .then(function (response) {
            console.log("image uploaded", response.data.IpfsHash)
            return {
               success: true,
               pinataURL: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
           };
        })
        .catch(function (error) {
            console.log("error",error.message)
            return {
                success: false,
                message: error.message,
            }

    });
};


export const getResponseFromUri = async(uriLink) => {

    


    return axios 
        .get(uriLink)
        .then(function (response) {
            
            console.log("response.data",response.data)
            return response.data
        })
        .catch(function (error) {
            console.log("error",error.message)
            return null

    });
};




export const getWeiFromEther = (_ether) => {
    const wei = ethers.parseEther(String(_ether));
    return wei.toString();
  
}
export const getEtherFromWei = (_wei) => {
    const eth = ethers.formatEther(String(_wei));
    return eth.toString()
  
}   