import Vue from 'vue'
import Router from 'vue-router'
// import Pos from '@/components/Pos'
// import Mall from '@/components/Mall'

Vue.use(Router)

const Pos = r => require.ensure(
  [],
  () => r(require('@/components/Pos')),
  'Pos'
)

const Mall = r => require.ensure(
  [],
  () => r(require('@/components/Mall')),
  'Mall'
)

// let Mall = (require) =>{
//   return require.ensure([],()=>{
//     require(require('@/components/Mall'))
//   })
// }

export default new Router({
  mode:'history',
  routes: [
    {
      path:'/',
      component:Pos,
      alias:"index.html",
      meta: {
         keepAlive: true
      }
    },
    {
      path: '/pos',
      name: 'Pos',
      component: Pos,
      meta: {
         keepAlive: true
      }
    },
    {
      path: '/mall',
      name: 'Mall',
      component: Mall
    }
  ]
})
