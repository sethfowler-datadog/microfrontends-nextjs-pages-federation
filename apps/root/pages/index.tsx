// App import is a workaround to load the app global styles
// which are only allowed to be imported in the remote _app
import NavigationApp from 'navigation/app';
import Header from 'navigation/header';
import Footer from 'navigation/footer';
import ContentPage from 'content/page';
import ContentApp from 'content/app';
import LoginPage from 'login/page';
import LoginApp from 'login/app';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect, useRef } from 'react';

function useDatadogRUM() {
  const serviceRef = useRef('root');

  useEffect(() => {
    if (!(window as any).DD_RUM) {
      return;
    }
    (window as any).DD_RUM.init({
      clientToken: '<CLIENT TOKEN HERE>',
      applicationId: '<APPLICATION ID HERE>',
      site: 'datadoghq.com',
      service: serviceRef.current,
      env: 'demo',
      version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      defaultPrivacyLevel: 'mask-user-input',
      beforeSend(event: any) {
        event.service = serviceRef.current;
      },
    });
  }, []);

  return serviceRef;
}

export default function Home() {
  const serviceRef = useDatadogRUM();
  const router = useRouter();

  const [service, pageContent] = (() => {
    switch (router.query.page ?? 'content') {
      case 'login':
        return ['login', <LoginApp Component={LoginPage} />];
      case 'content':
        return ['content', <ContentApp Component={ContentPage} />];
      default:
        return ['root', <></>];
    }
  })();
  serviceRef.current = service;

  return (
    <>
      <Script
        src="https://www.datadoghq-browser-agent.com/us1/v6/datadog-rum.js"
        strategy="beforeInteractive"
      />
      <NavigationApp Component={Header} />
      {pageContent}
      <NavigationApp Component={Footer} />
    </>
  );
}

export const getServerSideProps = () => {
  return {
    props: {},
  };
};
