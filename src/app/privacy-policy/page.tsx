"use client";

import cn from "classnames";
import styles from "./styles.module.scss";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link href="/">
          <img src="/img/newLogo.png" alt="logo" />
        </Link>
        <h1 className={cn(styles.title, "title--2xl")}>Privacy Policy</h1>
      </div>
      <aside className={styles.sidebar}></aside>
      <div className={styles.content}>
        <img
          className={styles.footerBackground}
          src="/img/footerBackground1.png"
          alt="logo"
        />
        <img
          className={styles.footerBackgroundTwo}
          src="/img/footerBackground2.png"
          alt="logo"
        />
        {/* Здесь будет текст политики конфиденциальности */}
        <p>
          MINTARION Privacy Policy <br /> Effective Date: [insert update date]{" "}
          <br />
          This Privacy Policy (the “Policy”) explains how the company operating
          under the MINTARION brand (the “Company,” “we,” “us”) collects, uses,
          discloses, and protects personal data of users of the website
          https://mintarion.com/ and any related services (the “Platform” or the
          “Service”). By using the Platform, you agree to the terms of this
          Policy. If you do not agree with this Policy, you must stop using the
          Platform. 1. Data Controller and Contact Information The Company is
          the controller of your personal data. For privacy-related inquiries,
          please contact us at privacy@mintarion.com or via the contact form on
          the Platform. 2. Types of Data Collected We may collect the following
          categories of data:
        </p>
        <ol>
          <li>
            Identification Data: first name, last name, email address, phone
            number, if provided during account registration or newsletter
            subscription.
          </li>
          <li>
            Account Data: username, password, profile settings, and other
            information associated with your account.
          </li>
          <li>
            Payment Data: transaction and payment information (such as amount,
            date, and payment reference) if you purchase paid services. Payment
            data may be processed by third-party payment providers, and we do
            not store full card details.
          </li>
          <li>
            Usage Data: information about your activity on the Platform,
            including IP address, browser type, visit date and time, pages
            viewed, interaction time, and other technical data automatically
            transmitted by your device.
          </li>
          <li>
            Cookies and Similar Technologies: cookies, web beacons, and similar
            technologies used to store and track information. See the cookie
            section below for details.
          </li>
        </ol>
        <p>
          We aim to collect only the data necessary to provide and improve the
          Service. <br /> 3. Data Sources and Collection Methods
        </p>
        <ul>
          <li>
            Direct Collection: data you provide directly when creating an
            account, filling out forms, participating in surveys, contacting
            support, or making purchases.
          </li>
          <li>
            Automatic Collection: when you interact with the Platform, we may
            automatically collect device and usage data such as IP address,
            device type, operating system, browser type, language, visit
            timestamps, and cookies.
          </li>
          <li>
            Third-Party Sources: we may receive data from partners (such as
            payment providers or social networks) if you link your account with
            third-party services. Such data is processed in accordance with this
            Policy.
          </li>
        </ul>
        <p>
          4. Purposes and Legal Bases for Processing <br /> We process personal
          data for the following purposes and, where applicable, based on one or
          more legal grounds under the GDPR:
        </p>
        <ol>
          <li>
            Providing and Maintaining the Service: to create and manage
            accounts, process transactions, manage subscriptions, and deliver
            Platform functionality. Legal basis: performance of a contract (GDPR
            Article 6(1)(b)).
          </li>
          <li>
            Improving and Developing the Service: to analyze how users interact
            with the Platform and improve user experience and features. Legal
            basis: legitimate interest (GDPR Article 6(1)(f)).
          </li>
          <li>
            Communication: to send service-related notifications, transaction
            messages, updates, changes to Terms, technical notices, or respond
            to your requests. Legal basis: performance of a contract or
            legitimate interest.
          </li>
          <li>
            Marketing Communications: with your consent, to send newsletters,
            offers, and promotional materials. You may withdraw your consent at
            any time. Legal basis: consent (GDPR Article 6(1)(a)).
          </li>
          <li>
            Legal Compliance and Security: to comply with legal obligations,
            ensure security, prevent fraud, and protect our legitimate
            interests. Legal basis: legal obligation (GDPR Article 6(1)(c)) and
            legitimate interest.
          </li>
          <li>
            Business Transfers: in the event of a merger, acquisition, or sale
            of assets, personal data may be transferred to a successor or
            purchaser. Legal basis: legitimate interest and/or performance of a
            contract.
          </li>
          <li>Cookies and Similar Technologies</li>
        </ol>
        <p>
          Cookies are small text files stored on your device. We use cookies to:
        </p>
        <ul>
          <li>
            enable core Service functionality (session cookies);
            <li>remember your preferences and settings;</li>
            <li>analyze traffic and improve Service performance;</li>
            <li>conduct marketing campaigns.</li>
          </li>
        </ul>
        <p>
          You can manage cookies through your browser settings. Disabling
          certain cookies may limit Platform functionality.
          <br />
          6. Data Disclosure and Sharing
          <br />
          We do not sell personal data. We may disclose your data to:
        </p>
        <ul>
          <li>
            Service Providers: companies that assist us in providing the
            Service, such as payment processors, hosting providers, analytics
            services, and marketing platforms. These parties access only the
            data necessary to perform their functions.
          </li>
          <li>
            Legal and Government Authorities: when required by law, court order,
            or to protect the rights, property, and safety of the Company,
            Users, or others.
          </li>
          <li>
            Affiliates and Successors: in connection with a merger, acquisition,
            or sale of assets, subject to applicable confidentiality
            requirements.
          </li>
        </ul>
        <p>
          If personal data is transferred outside the European Economic Area, we
          use appropriate safeguards such as standard contractual clauses and
          require recipients to provide an equivalent level of protection.{" "}
          <br /> 7. Data Retention and Security <br /> We retain personal data
          only for as long as necessary to fulfill the purposes described in
          this Policy or as required by law. Retention periods depend on the
          type of data and processing purpose. <br /> We implement technical and
          organizational measures to protect personal data against unauthorized
          access, loss, alteration, or disclosure. However, no method of
          internet transmission or electronic storage is completely secure, and
          we cannot guarantee absolute security. <br />
          8. User Rights (GDPR and Similar Laws) <br />
          If you are located in the European Union, the European Economic Area,
          or another jurisdiction providing similar rights, you may:
        </p>
        <ul>
          <li>Access: request a copy of your personal data.</li>
          <li>
            Rectification: correct or update inaccurate or incomplete data.
          </li>
          <li>
            Erasure: request deletion of your data where there is no lawful
            basis for continued processing.
          </li>
          <li>
            Restriction: request temporary restriction of data processing under
            certain conditions.
          </li>
          <li>
            Objection: object to processing based on legitimate interests.
          </li>
          <li>
            Data Portability: request transfer of your data to another
            controller in a structured, machine-readable format.
          </li>
          <li>
            Withdraw Consent: withdraw consent for marketing-related data
            processing at any time, without affecting the lawfulness of prior
            processing.
          </li>
        </ul>
        <p>
          To exercise these rights, contact us using the details in Section 1.
          We may request identity verification before fulfilling your request.{" "}
          <br /> 9. Children’s Privacy <br /> The Service is not intended for
          individuals under the age of 18. We do not knowingly collect personal
          data from children. If we become aware that a child has provided
          personal data without parental or guardian consent, we will delete
          such data. <br /> Parents or guardians may contact us to request
          removal. <br /> 10. Changes to This Policy <br />
          We may update this Policy from time to time to reflect changes in our
          data practices. The current version will always be published on the
          Platform with an updated effective date. We may notify users of
          material changes by email or through notices on the Platform.
          Continued use of the Service after changes take effect constitutes
          acceptance of the updated Policy. <br />
          11. Contact Information <br />
          If you have questions, comments, or requests regarding this Policy or
          the processing of your personal data, please contact us:
        </p>
        <ul>
          <li>Email: support@mintarion.com</li>
        </ul>
        <p>
          We aim to respond to personal data requests within a reasonable
          timeframe.
        </p>
      </div>
    </div>
  );
}
