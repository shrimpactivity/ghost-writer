import { useState } from 'react';

const useNotification = () => {
  const [value, setValue] = useState(null);
  const [notificationTimeout, setNotificationTimeout] = useState(null);
  console.log("toop level", notificationTimeout);

  /**
   * Sets the notification to the specified text, which returns to being empty after they specified delay.
   * Previous update calls will be overridden.
   * @param {string|ReactElement} content the notification content
   * @param {number|Infinity} [duration=4000] the amount of time the notification text will be set in milliseconds
   */
  const update = (content, duration = 4000) => {
    console.log("Content", content);
    console.log("TimeoutID", notificationTimeout);
    if (notificationTimeout !== null) {
      console.log('clearing');
      clearTimeout(notificationTimeout);
    }

    setValue(content);

    if (duration !== Infinity) {
      const newTimeout = setTimeout(() => {
        setValue(null);
        setNotificationTimeout(null);
      }, duration);
      console.log(newTimeout);
      setNotificationTimeout(newTimeout);
    }
  };

  return { value, update };
};

export default useNotification;
