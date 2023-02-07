import { useState } from 'react';

const useNotification = (initialText='') => {
  const [text, setText] = useState(initialText);
  const [notificationTimeout, setNotificationTimeout] = useState(null);

  /**
   * Sets the notification to the specified text, which returns to being empty after they specified delay.
   * Previous update calls will be overridden.
   * @param {string} text the notification text
   * @param {number|Infinity} [duration=4000] the amount of time the notification text will be set in milliseconds
   */
  const update = (notificationText, duration = 4000) => {
    if (notificationTimeout) {
      clearTimeout(notificationTimeout);
    }

    setText(notificationText);

    if (duration !== Infinity) {
      const newTimeout = setTimeout(() => {
        setText('');
        setText(null);
      }, duration);

      setNotificationTimeout(newTimeout);
    }
  };

  return { text, update };
};

export default useNotification;
