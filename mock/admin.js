import Mock from 'mockjs'

const data = Mock.mock({
    'items': [{
        path: "/example",
        state: 1,
        component: "Layout",
        redirect: '/example/table',
        meta: {
            icon: "example",
            title: "第一"
        },
        children: [
            {
                path: "table",
                component: "table/index",
                meta: {
                    icon: "table",
                    title: "第一表格",
                }
            },
            {
                path: "tree",
                component: "tree/index",
                meta: {
                    icon: "tree",
                    title: "第一树",
                }
            }
        ]
    },{
        path: '/form',
        component: 'Layout',
        state: 1,
        meta: { title: '一个表格', icon: 'form' },
        children: [
            {
            path: 'index',
            component: "form/index",
            meta: { title: '第一表单', icon: 'form',}
            }
        ]
    },]
})

export default [
    {
        url: '/role/list',
        type: 'get',
        response: config=> {
            const items = data.items
            return {
                code: 20000,
                data: {
                    role: 'admin',
                    items: items
                }
            }
        }
    },
    {
        url: '/activate',
        type: 'post',
        response: config=> {
            const items = data.items
            // items[0].state = 1
            // items[0].state == 1 ? items[0].state = 0 : items[0].state = 1
            // items[0].children[0].state == 1 ? items[0].children[0].state = 0 : items[0].children[0].state = 1
            // items[1].state == 1 ? items[1].state = 0 : items[1].state = 1
            return {
                code: 20000,
                msg: '激活码失效',
                data: {
                    role: 'admin',
                    items: items
                }
            }
        }
    }
]