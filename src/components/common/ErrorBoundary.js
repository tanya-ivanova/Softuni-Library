import { Component } from "react";
import { Link } from 'react-router-dom';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null
        }
    }

    static getDerivedStateFromError(error) {
        return { error: error.message };
    }

    componentDidCatch(error, errorInfo) {
        console.log('componentDidCatch');
    }

    render() {

        if (this.state.error) {
            return (
                <div className="message-when-no-data">
                    <h2>{this.state.error}</h2>
                    <p>Get back to <Link to="/">Home</Link> page and then Refresh the page in order to continue</p>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;