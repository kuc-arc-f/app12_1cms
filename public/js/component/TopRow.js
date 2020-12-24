class TopRow extends React.Component {
    componentDidMount(){
//        console.log(this.props.obj)
    }
    render(){
        var category_name = ""
        category_name = this.props.obj.category.name
// console.log(this.props.obj.category)
        return (
        <div className="post_items_wrap">
            <div className="div_news_rows">
                <a href={"/show/"+ this.props.obj._id}>
                    <h3 className="ml-10">{this.props.obj.title}</h3>
                </a>
            </div>
            <div>
                <ul className="ul_time_box">
                    <li>
                        <p className="mb-0">
                            <span className="mr-2 time_icon_wrap">
                                <i className="far fa-calendar"></i>
                            </span>
                            {this.props.obj.created_at}
                        </p>
                        <span className="folder_icon_wrap mr-2">
                                <i className="fas fa-folder"></i> {category_name}                  
                        </span>
                    </li>
                </ul>
            </div>
            <hr className="hr_ex1" />
        </div>
        )
    }
}

