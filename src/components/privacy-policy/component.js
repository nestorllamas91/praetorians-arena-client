import React from 'react';
import styles from '$root/components/privacy-policy/styles';

import Router from 'next/router';

export default function PrivacyPolicy() {
  function handleClickPraetoriansArena() {
    Router.push('/');
  }

  function handleClickContactForm() {
    Router.push('/contact');
  }

  return (
    <div className="main-container">
      <p>
        Néstor Llamas operates Praetorians Arena (
        <a onClick={handleClickPraetoriansArena}>https://praetorians-arena.nestorllamas.com</a>), which provides the
        service of an online competition platform for the videogame "Praetorians - HD Remaster". This page informs you
        of our policies regarding the collection, use and disclosure of personal information we receive from users of
        the website.
      </p>
      <h2 className="heading2">Information collection and use</h2>
      <hr />
      <p>
        We use your personal information only for providing and improving the website. By using the website, you agree
        to the collection and use of information in accordance with this policy. We will not use or share your
        information with anyone except as described in this policy.
      </p>
      <p>
        While using our website, we may ask you to provide us with certain personally identifiable information that can
        be used to contact or identify you. Personally identifiable information refers to Steam profile information,
        which includes your avatar, nickname, real name, country, Steam ID, and profile URL. Such data is automatically
        retrieved from the Steam database when you login with your Steam credentials through this website. Also, this
        data is displayed publicly on a page where all the data from all the players already registered is displayed.
      </p>
      <h2 className="heading2">Log data</h2>
      <hr />
      <p>
        We also collect some non-personally identifiable information, called log data, when users interact with our
        website through their web browsers. Non-personally identifiable information includes web browser names,
        operating systems, Internet service providers, the pages of our website that you visit, the time and date of
        your visit, the time spent on those pages and other statistics.
      </p>
      <p>
        This log data is useful for tracking things such as the number of visitors to the various parts of the website
        and interactions with the website. This log data is completely anonymous, and their sole purpose is to help us
        improve the experience of the website for the users. This log data is collected, monitored, and analyzed by
        Google Analytics, a third party service.
      </p>
      <h2 className="heading2">Cookies</h2>
      <hr />
      <p>
        Cookies are files with small amount of data, which may include an anonymous unique identifier. Cookies are sent
        to your web browser from a website you visit and stored on your computer's hard drive. Cookies consent can be
        revoked and modified at any time from your user panel, as well as you can clear any existing cookies at any time
        directly from your web browser settings.
      </p>
      <p>
        In particular, our website uses cookies for 2 kind of services. It uses a cookie for the user session and some
        cookies for the web analytics obtained by Google Analytics.
      </p>
      <p>
        The cookie for the user session is mandatory and autostored without your consent, since it is necessary in order
        to operate with the website and being able to use it completely as a competing player once you are authenticated
        with your Steam account. We integrate Steam OpenID 2.0 on our website, which is needed for the authentication
        and login.
      </p>
      <p>
        The cookies for the web analytics are optional and they are stored only with your consent, since these belongs
        to a third-party service and not needed in order to operate with the website. Remember that the purpose of these
        cookies is just to obtain some anonymous data from the users while browsing this website.
      </p>
      <h2 className="heading2">Third-parties</h2>
      <hr />
      <p>
        There may be some circumstances in which the non-personally identifiable information (anonymous log data) that
        we obtain from you may be shared with certain third-party companies. This would be in the case we need to share
        any statistical data with them.
      </p>
      <h2 className="heading2">Links to other websites</h2>
      <hr />
      <p>
        Our website may contain links to other websites. If you click on a third-party link, you will be directed to
        that website. Note that these external websites are not operated by us. Therefore, we strongly advise you to
        review the privacy policy of these websites. We have no control over, and assume no responsibility for the
        content, privacy policies, or practices of any third-party websites or services.
      </p>
      <h2 className="heading2">Acceptance and changes to this privacy policy</h2>
      <hr />
      <p>By continuing to access or use our services, you agree to the terms of our privacy policy.</p>
      <p>
        We may update our privacy policy from time to time. Thus, we advise you to review this page periodically for any
        changes. We will notify you of any changes by posting the new privacy policy on this page and by notifying it
        with a clear alert in the website. These changes are effective immediately, after they are posted on this page.
        Your continued use of our services after we post any modifications to the privacy policy on this page will
        constitute your acknowledgment of the modifications and your consent to agree to the terms of our modified
        privacy policy.
      </p>
      <h2 className="heading2">Contact us</h2>
      <hr />
      <p>
        If you have any questions or suggestions about our privacy policy, do not hesitate to contact us through the{' '}
        <a onClick={handleClickContactForm}>contact form</a>.
      </p>
      <style jsx>{styles}</style>
    </div>
  );
}
