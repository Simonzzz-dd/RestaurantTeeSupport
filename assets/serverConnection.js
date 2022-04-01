
/*eslint-disable */
import Cookies from 'js-cookie/dist/js.cookie.mjs'

let WEBSITEAPIKEY = "websiteone"
let HOSTLINK = "https://zimmoserv.xyz:5000"

function SetCookies ( cookies_ ) {
  console.log({FromSetCookies: cookies_})
    var duration = new Date(new Date().getTime() + 50 * 60 * 1000);
    var refreshTokenDuration = 365

    Cookies.set( WEBSITEAPIKEY + 'auth', cookies_.auth, {
        expires: duration
    });
    Cookies.set( WEBSITEAPIKEY + 'Manager', cookies_.Manager, {
        expires: duration
    });
    Cookies.set( WEBSITEAPIKEY + 'handleRequests', cookies_.handleRequests, {
        expires: duration
    });
    Cookies.set( WEBSITEAPIKEY + 'manageMoney', cookies_.manageMoney, {
        expires: duration
    });
    Cookies.set( WEBSITEAPIKEY + 'addProduts', cookies_.addProduts, {
      expires: duration
  });
    Cookies.set( WEBSITEAPIKEY + 'tk', cookies_.tk, {
        expires: duration
    });
    Cookies.set( WEBSITEAPIKEY + 'refreshTk', cookies_.refreshTk, {
      expires: refreshTokenDuration
  });
}

function getClientSideToken ( ) {
  
    let Token = {}
    let c = Cookies.get()
    if ( c[WEBSITEAPIKEY+"tk"] ) {
        Token.tk = c[WEBSITEAPIKEY+"tk"]
    }
    if ( c[WEBSITEAPIKEY+"refreshTk"] ) {
      Token.refreshTk = c[WEBSITEAPIKEY+"refreshTk"]
    }
    return Token
}

class ZimmoServerConnection {
  constructor (serverApiCode, host) {
    this.serverApiCode = serverApiCode
    this.host = host
  }
  //Website HTML
  getS1Image () {
    const products =  `${this.host}/web/${this.serverApiCode}/s1images`
    return products
  }
  getS2Image () {
    const products =  `${this.host}/web/${this.serverApiCode}/s2images`
    return products
  }

  async getS1Content () {
    const products = await fetch(`${this.host}/web/${this.serverApiCode}/GETs1Content`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      redirect: 'follow'
    })
    if (products.status == 200) {
      const data = await products.json()
      if (Object.keys(data).includes('sucess')) {
        return  data 
      }
      return data
    } else {
      return { err: 'something Went Wrong' }
    }
  }

  async getS2Content () {
    const products = await fetch(`${this.host}/web/${this.serverApiCode}/GETs2Content`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      redirect: 'follow'
    })
    if (products.status == 200) {
      const data = await products.json()
      if (Object.keys(data).includes('sucess')) {
        return  data 
      }
      return data
    } else {
      return { err: 'something Went Wrong' }
    }
  }

  async GetShopSection () {
    const products = await fetch(`${this.host}/web/${this.serverApiCode}/GetShopSection`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      redirect: 'follow'
    })
    if (products.status == 200) {
      const data = await products.json()
      if (Object.keys(data).includes('sucess')) {
        return  data 
      }
      return data
    } else {
      return { err: 'something Went Wrong' }
    }
  }
  async GETfooter () {
    const products = await fetch(`${this.host}/web/${this.serverApiCode}/GETfooter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      redirect: 'follow'
    })
    if (products.status == 200) {
      const data = await products.json()
      if (Object.keys(data).includes('sucess')) {
        return  data 
      }
      return data
    } else {
      return { err: 'something Went Wrong' }
    }
  }

  async getRequestMessage ( ) {
    const products = await fetch(`${this.host}/web/${this.serverApiCode}/getRequestMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      redirect: 'follow'
    })
    if (products.status == 200) {
      const data = await products.json()
      if (Object.keys(data).includes('sucess')) {
        return  data 
      }
      return data
    } else {
      return { err: 'something Went Wrong' }
    }
  }
  
  // All
  async Login (email, password) {
    const Outh = await fetch(`${this.host}/web/${this.serverApiCode}/sign`, {
      method: 'POST',
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(
        { email, password }
      )
    })
    if (Outh.status == 200) {
      const data = await Outh.json()
      if (data.sucess) SetCookies(data.sucess.cookies)
      if ( data.err ) SetCookies(data.err.cookies)
      return data
    } else {
      return { err: { msg: 'something Went Wrong' } }
    }
  }

  async Signup ( username, password, email, phoneNumber) {
    const Outh = await fetch(`${this.host}/web/${this.serverApiCode}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(
        { username, password, email, phoneNumber }
      )
    })
    if (Outh.status == 200) {
      const data = await Outh.json()
      if (data.sucess) SetCookies(data.sucess.cookies)
      if ( data.err ) SetCookies(data.err.cookies)
      return data
    } else {
      return { err: {msg:'something Went Wrong'} }
    }
  }

  async logout () {
    const Outh = await fetch(`${this.host}/web/${this.serverApiCode}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({token: getClientSideToken()})
    })
    if (Outh.status == 200) {
      const data = await Outh.json()
      if ( data.err?.cookies ) {
        SetCookies(data.err.cookies)
      }
      if ( data.sucess?.cookies ) {
        SetCookies(data.sucess.cookies)
      }
      return data
    } else {
      return { err: 'something Went Wrong' }
    }
  }

  async AuthState () {
    const Outh = await fetch(`${this.host}/web/${this.serverApiCode}/AuthState`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ token: getClientSideToken() })
    })
    if (Outh.status == 200) {
      const data = await Outh.json()
      if ( data.err?.cookies ) {
        SetCookies(data.err.cookies)
      }
      return data
    } else {
      return { err: 'something Went Wrong' }
    }
  }


  async createRecoveryKey ( email) {
    const Outh = await fetch(`${this.host}/web/${this.serverApiCode}/createKey`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(
        { email, token: getClientSideToken() }
      )
    })
    if (Outh.status == 200) {
      const data = await Outh.json()
      if ( data.err?.cookies ) {
        SetCookies(data.err.cookies)
      }
      return data
    } else {
      return { err: 'something Went Wrong' }
    }
  }

  async verifyRecoveryKey ( email, recoveryKey ) {
    const Outh = await fetch(`${this.host}/web/${this.serverApiCode}/verifyKeyPR`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(
        { email, recoveryKey, token: getClientSideToken() }
      )
    })
    if (Outh.status == 200) {
      const data = await Outh.json()
      if ( data.err?.cookies ) {
        SetCookies(data.err.cookies)
      }
      return data
    } else {
      return { err: 'something Went Wrong' }
    }
  }

  async changePassForForgeters ( email, newPassword ) {
    const Outh = await fetch(`${this.host}/web/${this.serverApiCode}/changePassForForgeters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(
        { email, newPassword, token: getClientSideToken() }
      )
    })
    if (Outh.status == 200) {
      const data = await Outh.json()
      if ( data.err?.cookies ) {
        SetCookies(data.err.cookies)
      }
      return data
    } else {
      return { err: 'something Went Wrong' }
    }
  }


  async getCookies ( ) {

    const Outh = await fetch(`${this.host}/web/${this.serverApiCode}/getCookies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      redirect: 'follow',
      body: JSON.stringify({token: getClientSideToken()})
    })
    
    if (Outh.status == 200) {
      const data = await Outh.json()
      if ( data.err?.cookies ) {
        SetCookies(data.err.cookies)
      }
      if ( data.sucess?.cookies ) {
        SetCookies(data.sucess.cookies)
      }

      return data
    } else {
      return { err: 'something Went Wrong' }
    }
  }


  // User -----------
  async requestProduct (phoneNumber, email, username, location, ItemsIrray) {
    let productsId = []
    ItemsIrray.map( ele => {
      if (ele.quantity > 1 ) {
        for ( let n= 0; n < ele.quantity; n++) {
          productsId.push(ele.ProductId)
        } 
      } else {
        productsId.push(ele.ProductId) 
      }

    })
    let Tips = ItemsIrray.map( ele => {
      if ( ele.tips ) {
        return {
          productName: ele.productName,
          tips: ele.tips
        }
      }
    })

 
    const Outh = await fetch(`${this.host}/web/${this.serverApiCode}/requestProduct`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ phoneNumber, email, username, location, productsId, Tips, token: getClientSideToken() })
    })
    if (Outh.status == 200) {
      const data = Outh.json()
      return data
    } else {
      return { err: 'something Went Wrong' }
    }
  }

  async getRequests () {
    const products = await fetch(`${this.host}/web/${this.serverApiCode}/getRequests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({token: getClientSideToken()})
    })
    if (products.status == 200) {
      const data = await products.json()
      if ( data.err?.cookies ) {
        SetCookies(data.err.cookies)
      }
      return data
    } else {
      return { err: 'something Went Wrong' }
    }
  }

  async getClientDataAndPursh () {
    const products = await fetch(`${this.host}/web/${this.serverApiCode}/getUserDataWithPurchises`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ token: getClientSideToken() })
    })
    if (products.status == 200) {
      const data = await products.json()
      if ( data.err?.cookies ) {
        SetCookies(data.err.cookies)
      }
      return data
    } else {
      return { err: 'something Went Wrong' }
    }
  }
  // Manager ----------------------------
  async AddProduct (productName, price, content, file, discount, inPromotion, ArrayOfImages, terms ) {
    const formData = new FormData()
    formData.append('productName', productName)
    formData.append('price', price)
    formData.append('content', content)
    formData.append('terms', terms)
    formData.append('refreshTk',getClientSideToken().refreshTk)
    formData.append('tk',getClientSideToken().tk)
    formData.append('image', file, file?.name)
    if ( ArrayOfImages.length > 0 ) {
      ArrayOfImages.map(( ele ) => {
        formData.append('extra_images', ele, ele?.name)
      })      
    }

    formData.append('discount', discount)
    formData.append('inPromotion', inPromotion)
    console.log(formData)
    const Outh = await fetch(`${this.host}/web/${this.serverApiCode}/addProduct`, {
      method: 'POST',
      credentials: 'include',
      body: formData
    })
    if (Outh.status == 200) {
      const data = await Outh.json()
      if ( data.err?.cookies ) {
        SetCookies(data.err.cookies)
      }
      return data
    } else {
      return { err: 'something Went Wrong' }
    }
  }

  async getAllProducts () {
    const products = await fetch(`${this.host}/web/${this.serverApiCode}/getAllProducts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({token: getClientSideToken() })
    })
    if (products.status == 200) {
      const data = await products.json()
      if ( data.err?.cookies ) {
        SetCookies(data.err.cookies)
      }
      if (Object.keys(data).includes('sucess')) {
        const AllProducts = [...data.sucess]
        AllProducts.map((ele, i) => {
          ele.extraImages.forEach( ( ID, i) => {
            ele.extraImages[i] = `${this.host}/web/${this.serverApiCode}/xtraImage/${ID}`
          })
          ele.imgId = `${this.host}/web/${this.serverApiCode}${ele.imgId}`
          return { sucess: AllProducts }
        })
      }
      return data
    } else {
      return { err: 'something Went Wrong' }
    }
  }

  async getProductsAtSequence ( start ) {
    const products = await fetch(`${this.host}/web/${this.serverApiCode}/geProductSequence`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ start, token: getClientSideToken()  })
    })
    if (products.status == 200) {
      const data = await products.json()
      if ( data.err?.cookies ) {
        SetCookies(data.err.cookies)
      }
      if (Object.keys(data).includes('sucess')) {
        const AllProducts = [...data.sucess]
        AllProducts.map((ele, i) => {
          ele.extraImages.forEach( ( ID, i) => {
            ele.extraImages[i] = `${this.host}/web/${this.serverApiCode}/xtraImage/${ID}`
          })
          ele.imgId = `${this.host}/web/${this.serverApiCode}${ele.imgId}`
          return { sucess: AllProducts }
        })
      }
      return data
    } else {
      return { err: 'something Went Wrong' }
    }
  }

  async getProduct ( id ) {
    const products = await fetch(`${this.host}/web/${this.serverApiCode}/getProduct`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({id, token: getClientSideToken() })
    })
    if (products.status == 200) {
      const data = await products.json()
      if ( data.err?.cookies ) {
        SetCookies(data.err.cookies)
      }
      if (Object.keys(data).includes('sucess')) {
        let product = data.sucess
        product.extraImages.forEach( ( ID, i) => {
          product.extraImages[i] = `${this.host}/web/${this.serverApiCode}/xtraImage/${ID}`
        })
        product.imgId = `${this.host}/web/${this.serverApiCode}${product.imgId}`
        return data
      }
      return data
    } else {
      return { err: 'something Went Wrong' }
    }
  }
  async getWebsite ( id ) {
    const products = await fetch(`${this.host}/web/${this.serverApiCode}/getWebsite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      credentials: 'include',
      body: JSON.stringify({token: getClientSideToken() })
    })
    if (products.status == 200) {
      const data = await products.json()
      if ( data.err?.cookies ) {
        SetCookies(data.err.cookies)
      }
      if (Object.keys(data).includes('sucess')) {
        return data
      }
      return data
    } else {
      return { err: 'something Went Wrong' }
    }
  }

  async changeBalance ( id, Balance) {
    const Outh = await fetch(`${this.host}/web/${this.serverApiCode}/changeBalance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      credentials: 'include',
      body: JSON.stringify(
        { id, Balance, token: getClientSideToken()  }
      )
    })
    if (Outh.status == 200) {
      const data = await Outh.json()
      if ( data.err?.cookies ) {
        SetCookies(data.err.cookies)
      }
      return data
    } else {
      return { err: 'something Went Wrong' }
    }
  }

  async DeleteProduct (id) {
    const products = await fetch(`${this.host}/web/${this.serverApiCode}/DeleteProduct`, {
      method: 'POST',
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ id, token: getClientSideToken()  })
    })
    if (products.status == 200) {
      const data = await products.json()
      if ( data.err?.cookies ) {
        SetCookies(data.err.cookies)
      }
      return data
    } else {
      return { err: 'something Went Wrong' }
    }
  }

  async DeleteRequest (id) {
    const products = await fetch(`${this.host}/web/${this.serverApiCode}/DeleteRequest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ id, token: getClientSideToken()  })
    })
    if (products.status == 200) {
      const data = await products.json()
      if ( data.err?.cookies ) {
        SetCookies(data.err.cookies)
      }
      return data
    } else {
      return { err: 'something Went Wrong' }
    }
  }

  async UpdateProduct (productName, id, price, content, file, discount, inPromotion, commentsState) {
    const formData = new FormData()
    formData.append('productName', productName)
    formData.append('price', price)
    formData.append('id', id)
    formData.append('refreshTk',getClientSideToken().refreshTk)
    formData.append('tk',getClientSideToken().tk)
    formData.append('content', content)
    formData.append('commentsState', commentsState)
    formData.append('discount', discount)
    formData.append('inPromotion', inPromotion)
    if (file) {
      formData.append('image', file, file?.name)
    }
    const Outh = await fetch(`${this.host}/web/${this.serverApiCode}/updateProduct`, {
      method: 'POST',
      credentials: 'include',
      body: formData
    })
    if (Outh.status == 200) {
      const data = await Outh.json()
      if ( data.err?.cookies ) {
        SetCookies(data.err.cookies)
      }
      return data
    } else {
      return { err: 'something Went Wrong' }
    }
  }

  async getAllSales () {
    const products = await fetch(`${this.host}/web/${this.serverApiCode}/getAllSales`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({token: getClientSideToken()})
    })
    if (products.status == 200) {
      const data = await products.json()
      if ( data.err?.cookies ) {
        SetCookies(data.err.cookies)
      }
      return data
    } else {
      return { err: 'something Went Wrong' }
    }
  }

  async getSale ( id ) {
    const products = await fetch(`${this.host}/web/${this.serverApiCode}/getSale`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ id, token: getClientSideToken() })
    })
    if (products.status == 200) {
      const data = await products.json()
      if ( data.err?.cookies ) {
        SetCookies(data.err.cookies)
      }
      return data
    } else {
      return { err: 'something Went Wrong' }
    }
  }

  async getAllClients () {
    const products = await fetch(`${this.host}/web/${this.serverApiCode}/getAllClients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ token: getClientSideToken()  })
    })
    if (products.status == 200) {
      const data = await products.json()
      if ( data.err?.cookies ) {
        SetCookies(data.err.cookies)
      }
      return data
    } else {
      return { err: 'something Went Wrong' }
    }
  }

  async getUsersWithPerm () {
    const products = await fetch(`${this.host}/web/${this.serverApiCode}/ClientsWithPerm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({token: getClientSideToken() })
    })
    if (products.status == 200) {
      const data = await products.json()
      if ( data.err?.cookies ) {
        SetCookies(data.err.cookies)
      }
      return data
    } else {
      return { err: 'something Went Wrong' }
    }
  }
  
  async AddClientsPerm ( email ,addProduts, Manager, manageMoney, handleRequests ) {
    const Outh = await fetch(`${this.host}/web/${this.serverApiCode}/AddPermissions`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ email ,addProduts, Manager, manageMoney, handleRequests, token: getClientSideToken()  })
    })
    if (Outh.status == 200) {
      const data = await Outh.json()
      if ( data.err?.cookies ) {
        SetCookies(data.err.cookies)
      }
      return data
    } else {
      return { err: 'something Went Wrong' }
    }
  }


  // Sales -----------------------------------------
  async approveRequest (id) {
    const Outh = await fetch(`${this.host}/web/${this.serverApiCode}/approveRequest`, {
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ id, token: getClientSideToken()  })
    })
    if (Outh.status == 200) {
      const data = await Outh.json()
      if ( data.err?.cookies ) {
        SetCookies(data.err.cookies)
      }
      return data
    } else {
      return { err: 'something Went Wrong' }
    }
  }

  async SoldProducts (id) {
    const Outh = await fetch(`${this.host}/web/${this.serverApiCode}/soldProducts`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ id, token: getClientSideToken() })
    })
    if (Outh.status == 200) {
      const data = await Outh.json()
      if ( data.err?.cookies ) {
        SetCookies(data.err.cookies)
      }
      return data
    } else {
      return { err: 'something Went Wrong' }
    }
  }

  async getAllRequests () {
    const products = await fetch(`${this.host}/web/${this.serverApiCode}/getAllRequests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({token: getClientSideToken()})
    })
    if (products.status == 200) {
      const data = await products.json()
      if ( data.err?.cookies ) {
        SetCookies(data.err.cookies)
      }
      return data
    } else {
      return { err: 'something Went Wrong' }
    }
  }

  // Settings ---------------------------------------------------------------
  async AddSendGridApiKey (sendGridApiKey) {
    const Outh = await fetch(`${this.host}/web/${this.serverApiCode}/addSendGridApiKey`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ sendGridApiKey, token: getClientSideToken()  }) 
    })
    if (Outh.status == 200) {
      const data = await Outh.json()
      if ( data.err?.cookies ) {
        SetCookies(data.err.cookies)
      }
      return data
    } else {
      return { err: 'something Went Wrong' }
    }
  }

  async changeEmail ( email ) {
    const Outh = await fetch(`${this.host}/web/${this.serverApiCode}/changeEmail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ email, token: getClientSideToken() })
    })
    if (Outh.status == 200) {
      const data = await Outh.json()
      if ( data.err?.cookies ) {
        SetCookies(data.err.cookies)
      }
      return data
    } else {
      return { err: 'something Went Wrong' }
    }
  }

  async RequestMailMsg ( requestConfirmationMsg ) {
    const Outh = await fetch(`${this.host}/web/${this.serverApiCode}/mailMsg`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ requestConfirmationMsg, token: getClientSideToken() })
    })
    if (Outh.status == 200) {
      const data = await Outh.json()
      if ( data.err?.cookies ) {
        SetCookies(data.err.cookies)
      }
      return data
    } else {
      return { err: 'something Went Wrong' }
    }
  }

  async AprovedRequestMsg (RequestMsg) {
    const Outh = await fetch(`${this.host}/web/${this.serverApiCode}/addAproveRequestmsg_`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ RequestMsg, token: getClientSideToken() })
    })
    if (Outh.status == 200) {
      const data = await Outh.json()
      if ( data.err?.cookies ) {
        SetCookies(data.err.cookies)
      }
      return data
    } else {
      return { err: 'something Went Wrong' }
    }
  }

  async footerContent ( pint, insta, twitter, facebook, content ) {
    const Outh = await fetch(`${this.host}/web/${this.serverApiCode}/EditFooterContent`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ pint, insta, twitter, facebook, content, token: getClientSideToken() })
    })
    if (Outh.status == 200) {
      const data = await Outh.json()
      if ( data.err?.cookies ) {
        SetCookies(data.err.cookies)
      }
      return data
    } else {
      return { err: 'something Went Wrong' }
    }
  }

  async AddShopSectionMsg ( h1, p ) {
    const Outh = await fetch(`${this.host}/web/${this.serverApiCode}/AddShopSectionMsg`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ h1, p, token: getClientSideToken() })
    })
    if (Outh.status == 200) {
      const data = await Outh.json()
      if ( data.err?.cookies ) {
        SetCookies(data.err.cookies)
      }
      return data
    } else {
      return { err: 'something Went Wrong' }
    }
  }


  async SectionOneContent (h1, p, file) {
    const formData = new FormData()
    formData.append('image', file, file?.name)
    formData.append('h1', h1)
    formData.append('p', p)
    formData.append('refreshTk',getClientSideToken().refreshTk)
    formData.append('tk',getClientSideToken().tk)
    const Outh = await fetch(`${this.host}/web/${this.serverApiCode}/SectionOne`, {
      method: 'POST',
      credentials: 'include',
      body: formData
    })
    if (Outh.status == 200) {
      const data = await Outh.json()
      if ( data.err?.cookies ) {
        SetCookies(data.err.cookies)
      }
      return data
    } else {
      return { err: 'something Went Wrong' }
    }
  }

  async SectionTwoContent (h1, p, file) {
    const formData = new FormData()
    formData.append('image', file, file?.name)
    formData.append('h1', h1)
    formData.append('p', p)
    formData.append('refreshTk',getClientSideToken().refreshTk)
    formData.append('tk',getClientSideToken().tk)
    const Outh = await fetch(`${this.host}/web/${this.serverApiCode}/SectionTwo`, {
      method: 'POST',
      credentials: 'include',
      body: formData
    })
    if (Outh.status == 200) {
      const data = await Outh.json()
      if ( data.err?.cookies ) {
        SetCookies(data.err.cookies)
      }
      return data
    } else {
      return { err: 'something Went Wrong' }
    }
  }
}

let Connection_ = new ZimmoServerConnection(WEBSITEAPIKEY,HOSTLINK)


export default Connection_
