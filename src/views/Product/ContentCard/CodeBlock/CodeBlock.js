import React from 'react';
import PropTypes from 'prop-types';
import SyntaxHighlighter from 'react-syntax-highlighter';

export default class CodeBlock extends React.PureComponent {
    static propTypes = {
        language: PropTypes.string,
        value: PropTypes.string.isRequired,
    }

    static defaultProps = {
        language: null,
    }

    render() {
        const { language, value } = this.props;

        return (
            <div style={{marginTop:"5px", marginBottom:"5px", flexWrap:"wrap"}}>
            <SyntaxHighlighter language={language} >
                {value}
            </SyntaxHighlighter>
            </div>
        );
    }
}