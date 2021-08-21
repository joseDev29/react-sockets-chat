import { animateScroll } from "react-scroll";

export const scrollToBottom = (idHTML) => {
  animateScroll.scrollToBottom({
    containerId: idHTML,
    duration: 0,
  });
};

export const scrollToBottomAnimated = (idHTML) => {
  animateScroll.scrollToBottom({
    containerId: idHTML,
    duration: 250,
  });
};
