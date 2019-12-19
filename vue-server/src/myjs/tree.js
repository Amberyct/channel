function tree(info, pid) {
    var data = [];
    for (let i in info) {
        if (info[i].pid == pid) {
            var x = {
                value: info[i]._id,
                label: info[i].title,
                children: tree(info, info[i]._id)
            };
            // 如果 没有子权限 -- 删除 children 属性
            if (x.children.length == 0) {
                delete x.children;
            }
            data.push(x);
            // console.log(data);
        }
    }
    return data;
}

export default tree;