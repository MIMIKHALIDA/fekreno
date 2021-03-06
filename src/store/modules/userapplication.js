import UserApplication from './../../models/UserApplication'

const userapp = {
  state: {
  },

  mutations: {

  },

  actions: {

    GetAllUserApplications ({ commit }) {

      let filter = {
        include: [
          { relation: 'user' },
          { relation: 'application' }
        ]
      }
      return new Promise((resolve, reject) => {
        this.$repository.userapplication.listing(filter)
          .then(res => {
            UserApplication.insert({ data: res.data })
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },

    GetApplicationAllPartipants({ commit }, applicationId) {

      let filter = {
        where: {applicationId: applicationId} ,
        include: [
          {
            relation: 'user'
          }
        ]
      }

      return new Promise((resolve, reject) => {
        this.$repository.userapplication.listing(filter)
          .then(res => {
            UserApplication.insert({ data: res.data })
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },

    UpdateUserApplication({ commit }, data) {
      return new Promise((resolve, reject) => {
        let id = data.id
        delete data.id
        
        data.answers = JSON.stringify(data.answers)

        this.$repository.userapplication.updateById(id, data)
          .then(res => {
            UserApplication.update({ where: id, data: data })
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },

    SubmitUserApplication({ commit }, data) {
      return new Promise((resolve, reject) => {
        let id = data.id
        delete data.id

        data.state = 'submit'
        data.status = 'submitted'
  
        this.$repository.userapplication.updateById(id, data)
          .then(res => {
            UserApplication.update({ where: id, data: data })
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    }

  }
}

export default userapp
