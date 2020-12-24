class IndexRow extends React.Component {
    componentDidMount(){
//        console.log(this.props.obj)
    }
    render(){
        var category_name = ""
        category_name = this.props.obj.category.name
        console.log(this.props.obj.category)
        return (
        <tr>
            <td>
                {this.props.obj._id}
            </td>
            <td>
                <a href={"/cms_posts/show/"+ this.props.obj._id}><h3>{this.props.obj.title}</h3>
                </a>
                <a href={"/cms_posts/edit/"+ this.props.obj._id}> [ edit ]
                </a><br />
                {category_name}, 
                {this.props.obj.date_str}

            </td>
            <td>
            </td>
        </tr>
        )
    }
}

