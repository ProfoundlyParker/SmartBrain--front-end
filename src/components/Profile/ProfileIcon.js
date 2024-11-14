import React from "react";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
  } from 'reactstrap';

class ProfileIcon extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        }
    }

    toggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    render() {
        return (
        <div className="pa4 tc">
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle 
                tag="span" 
                data-toggle="dropdown" 
                aria-expanded={this.state.dropdownOpen}>
                         <img
                                src="https://plus.unsplash.com/premium_photo-1664299466090-8b508c9a7fe6?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmxhY2slMjBwdXBweXxlbnwwfHwwfHx8MA%3D%3D"
                                class="br-100 ba h3 w3 dib" alt="avatar">
                        </img>
               </DropdownToggle>
                <DropdownMenu className="b--transparent shadow-5" style={{marginTop: '2rem', backgroundColor: 'rgba(255, 255, 255, 0.5)'}}>
                    <DropdownItem onClick={this.props.toggleModal}>View Profile</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={() => this.props.onRouteChange('signout')}>Sign Out</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
        );
    }
}

export default ProfileIcon;