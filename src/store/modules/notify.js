import notification from 'ant-design-vue/es/notification'

const notify = {
  state: {
    type: null,
    message: '',
    description: ''
  },
  mutations: {
    notify: (state, options) => {
      console.log('notify', options, state)
      if (options) {
        state.type = options.type
        state.message = options.message
        state.description = options.description
      } if (state.type) {
        notification[state.type]({
          message: state.message,
          description: state.description
        })
        state.type = null
      }
    }
  }
}

export default notify
