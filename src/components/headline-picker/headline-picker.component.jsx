import React, { Component, useEffect } from 'react';

import {
    HeadlineOneButton,
    HeadlineTwoButton,
    HeadlineThreeButton,
} from '@draft-js-plugins/buttons';

class HeadlinesPicker extends Component {
    componentDidMount() {
      setTimeout(() => {
        window.addEventListener('click', this.onWindowClick);
      });
    }
  
    componentWillUnmount() {
      window.removeEventListener('click', this.onWindowClick);
    }
  
    onWindowClick = () =>
      // Call `onOverrideContent` again with `undefined`
      // so the toolbar can show its regular content again.
      this.props.onOverrideContent(undefined);
  
    render() {
      const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton];
      return (
        <div>
          {buttons.map((Button, i) => (
            // eslint-disable-next-line
            <Button key={i} {...this.props} />
          ))}
        </div>
      );
    }
}

export default HeadlinesPicker

// const HeadlinePicker = (props) => {
//     const { onOverrideContent } = props;
    
//     // Call `onOverrideContent` again with `undefined`
//     // so the toolbar can show its regular content again.
//     const onWindowClick = () => onOverrideContent(undefined);

//     useEffect(() => {
//         setTimeout(() => {
//             window.addEventListener('click', onWindowClick);
//         });
//         // Specify how to clean up after this effect:
//         return window.removeEventListener('click', onWindowClick);
//     }, []);

//     const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton];

//     return (
//         <div>
//             {buttons.map((Button, i) => (
//                 // eslint-disable-next-line
//                 <Button key={i} {...props} />
//             ))}   
//         </div>
//     );
// }

// export default HeadlinePicker
