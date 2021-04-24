const UserModel = require("../models/user");
const paginate = require("../../common/paginate");

const index = async (req,res) =>{
    const page = parseInt(req.query.page) || 1;
    const limit = 2;
    const skip = page* limit - limit;

    const total = await UserModel.find().countDocuments();
    const totalPage = Math.ceil(total/limit);
    console.log(paginate(page,totalPage));



    const users = await UserModel.find().populate().skip(skip).limit(limit);
    res.render("admin/user/user", 
    {
        users: users, 
        pages: paginate(page, totalPage),
        page:page,
        totalPage:totalPage,
    });
}

const add = async (req,res) =>{
    res.render("admin/user/add_user",{data:{}});
}
const postAdd = async (req,res) => {
    let error = "";
    const name = req.body.user_full;
    const mail = req.body.user_mail;
    const pass = req.body.user_pass;
    const repass = req.body.user_re_pass;
    const users = await UserModel.find({email:mail});
    if(name == "" || mail == "" || pass == "" || repass == "") {
        error = "Bạn phải nhập đầy đủ thông tin!";
    }
    else if(pass != repass) {
        error = "Mật khẩu nhập lại cần phải khớp!";
    }
    else if(users.length > 0){
        error = "Email đã tồn tại!";
    }
    else{

    }
    res.render("admin/user/add_user", {data:{error}});
    
}


module.exports = {
    index:index,
    add:add,
    postAdd,
}