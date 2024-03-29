const ClueIndex = () =>
  import(/* webpackChunkName: "Clue" */ '@/views/Clue/ClueIndex.vue')
// const ClueEdit = () =>
//   import(/* webpackChunkName: "Clue" */ '@/views/Clue/ClueEdit.vue')
const ClueLog = () =>
  import(/* webpackChunkName: "Clue" */ '@/views/Clue/ClueLog.vue')
// const ClueCreate = () =>
//   import(/* webpackChunkName: "Clue" */ '@/views/Clue/ClueCreate.vue')

export default [
  {
    path: '/clue',
    name: 'Clue',
    redirect: { name: 'ClueIndex' },
    meta: {
      permission: 'clue-index',
      nav: {
        icon: 'icon-file',
        title: '线索管理'
      },
      breadcrumb: {
        name: '线索'
      }
    },
    children: [
      {
        path: '',
        name: 'ClueIndex',
        component: ClueIndex,
        meta: {
          permission: 'clue-index',
          nav: {
            title: '线索列表'
          },
          breadcrumb: {
            name: '线索列表'
          }
        }
      },
      {
        path: ':id',
        name: 'Cluelog',
        component: ClueLog,
        // meta: {
        //   permission: 'clue-index',
        //   nav: {
        //     title: '线索追踪'
        //   },
        //   breadcrumb: {
        //     name: '线索追踪'
        //   }
        // }
      },
    ]
  }
]
