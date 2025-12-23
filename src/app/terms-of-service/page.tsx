"use client";

import cn from "classnames";
import styles from "./styles.module.scss";
import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link href="/">
          <img src="/img/newLogo.png" alt="logo" />
        </Link>
        <h1 className={cn(styles.title, "title--2xl")}>Terms of Service</h1>
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
        <p>
          MINTARION Terms of Service <br /> Effective Date: [15.12.2025] <br />
          1. Introduction <br />
          These Terms of Service (the "Terms") set out the rules and conditions
          governing access to the website https://mintarion.com/ and related
          applications, services and products (collectively, the "Service"). The
          Service is owned and operated by the company doing business under the
          brand MINTARION (the "Company," "we," "us"). By using the Service, you
          confirm that you have read these Terms, agree with them and undertake
          to comply with them. If you do not agree to the Terms, you must
          immediately stop using the Service.
        </p>
        <p>
          2. Definitions <br /> In these Terms the following terms have the
          meanings specified:
        </p>
        <p>
          <strong>Platform:</strong> the mintarion.com website and any related
          services that provide the opportunity to create, publish or otherwise
          use digital content and/or receive digital products and services of
          the Company.
        </p>
        <p>
          <strong>User or you:</strong> an individual or legal entity accessing
          the Platform, registering an account or using the Service.
        </p>
        <p>
          <strong>Content:</strong> any data, text, images, video, audio
          recordings, graphics, software code, links and other materials posted
          or transmitted through the Platform.
        </p>
        <p>
          <strong>Account:</strong> a unique record created by the User to
          access the features of the Platform, containing the User's personal
          data, such as name, email address and other information.
        </p>
        <h2>3. Access and Acceptance of Terms</h2>
        <h3>3.1 Age and Capacity.</h3>
        <p>
          To use the Service, you must be at least 18 years old and have the
          capacity to enter into contracts. If you are under 18, you may use the
          Service only with the consent and supervision of a parent or legal
          guardian.
        </p>
        <h3>3.2 Account Creation.</h3>
        <p>
          To access certain features of the Platform, registration of an account
          may be required. You agree to provide accurate, complete and
          up‑to‑date information and to update it in a timely manner. You are
          responsible for keeping your login credentials (username and password)
          confidential and for all actions taken through your account. If you
          suspect unauthorized use of your account, you agree to immediately
          notify us.
        </p>
        <h3>3.3 Acceptance of Terms.</h3>
        <p>
          By registering on the Platform, pressing the "I accept" button or
          similar, or otherwise using the Service, you confirm your consent to
          these Terms and the Privacy Policy. In some cases, we may use a
          click‑wrap method (a consent checkbox) to confirm your acceptance —
          such a mechanism increases enforceability of the agreement.
        </p>
        <h2>4. Description of the Service</h2>
        <p>
          The Company provides a digital Platform which may include offers to
          purchase digital assets, subscriptions, access to content,
          opportunities to upload user content and other related services. The
          specific functionality of the Service may change at the discretion of
          the Company. The Company may set up paid and free sections, offer
          subscriptions, trial periods, rewards and other conditions.
        </p>
        <h2>5. User Conduct and Restrictions</h2>
        <h3>5.1 General Obligations.</h3>
        <p>By using the Service, you agree to:</p>
        <ul>
          <li>comply with all applicable laws and regulations;</li>
          <li>
            not violate the intellectual property rights of the Company or third
            parties (copyright, patents, trademarks, etc.);
          </li>
          <li>
            not post illegal, offensive, harmful, defamatory or discriminatory
            content;
          </li>
          <li>
            not take actions that may damage the Platform or interfere with its
            operation (such as sending spam, using malicious code, hacking);
          </li>
          <li>
            not impersonate another person or organization, not create accounts
            automatically or use the Platform for any illegal purposes.
          </li>
        </ul>
        <h3>5.2 User Content.</h3>
        <p>
          You may post or upload content within the Platform's functionality.
          You confirm that you have all necessary rights to such content. By
          providing content, you grant the Company a non‑exclusive, worldwide
          license to use, reproduce, modify, publish and distribute it to
          provide the Service. The Company is not obligated to monitor or
          moderate user content, but reserves the right to remove or block
          content that violates these Terms, the law or third‑party rights.
        </p>
        <h3>5.3 Prohibited Content.</h3>
        <p>
          Posting prohibited content may result in blocking or deleting the
          account without prior notice. Prohibited content includes materials
          that violate laws, contain threats, violence, hate speech, sexual
          content, personal data without consent of the owner and other
          materials not in line with these Terms.
        </p>
        <h2>6. Payment and Subscriptions</h2>
        <p>
          If you purchase a paid subscription or paid services on the Platform,
          you agree to pay the applicable fees and taxes. Payment processes may
          be handled by third-party providers (e.g. payment systems). Payment
          and refund terms are governed by the payment section presented at
          checkout. We may change the cost of services, providing prior notice
          and an opportunity to cancel the subscription before the changes take
          effect.
        </p>
        <h2>7. Intellectual Property</h2>
        <h3>7.1 Company Ownership.</h3>
        <p>
          The Platform, including design, text, graphics, logos, software and
          other elements, is intellectual property of the Company and/or its
          licensors and is protected by law. Except as expressly permitted in
          the Terms, you are not granted any right to copy, modify, distribute
          or create derivative works based on our materials.
        </p>
        <h3>7.2 Feedback.</h3>
        <p>
          If you submit suggestions or feedback regarding the Platform's
          operation, you grant the Company a non‑exclusive right to use such
          materials without compensation.
        </p>
        <h2>8. Third‑Party Resources and Links</h2>
        <p>
          The Platform may contain links to third-party websites or services
          that are not controlled by the Company. We are not responsible for the
          content, privacy policies or practices of third-party resources. Your
          use of third-party sites is governed by their own terms and policies.
        </p>
        <h2>9. Termination of Access</h2>
        <p>
          We may, at our discretion, suspend or terminate your access to the
          Platform (including deleting your account) if you violate these Terms,
          applicable law, third‑party rights or if use of the Service may harm
          the Company or other users. You may terminate use of the Platform at
          any time by deleting your account or stopping access.
        </p>
        <h2>10. Disclaimer of Warranties and Limitation of Liability</h2>
        <h3>10.1 "As Is" and "As Available."</h3>
        <p>
          The Service is provided "as is" and "as available" without any
          warranties, express or implied, including, but not limited to,
          warranties of merchantability, fitness for a particular purpose and
          non-infringement. We do not warrant that the Service will be
          uninterrupted, secure or error‑free.
        </p>
        <h3>10.2 Limitation of Liability.</h3>
        <p>
          Neither the Company nor its directors, employees, partners, agents or
          suppliers shall be liable for any indirect, incidental, special,
          punitive or consequential damages, including loss of profit, data,
          reputation or other intangible losses arising in connection with your
          use of the Service, even if the Company has been advised of the
          possibility of such damages. The Company's total liability for any
          claim shall not exceed the amount you paid the Company for access to
          the Service in the last twelve months.
        </p>
        <h2>11. Indemnification</h2>
        <p>
          You agree to hold harmless and defend the Company, its affiliates,
          employees and partners from any claims, losses, liabilities, damages
          and expenses (including reasonable legal fees) arising from or related
          to your access to the Service, your use of the Platform, your
          violation of these Terms or the rights of third parties.
        </p>
        <h2>12. Governing Law and Dispute Resolution</h2>
        <p>
          These Terms are governed and interpreted in accordance with the laws
          of the Netherlands (unless mandatory rules of law state otherwise).
          Any disputes arising from or related to these Terms are subject to the
          exclusive jurisdiction of the competent courts of the Netherlands,
          unless consumer protection law provides otherwise. Before going to
          court, the parties agree to make reasonable efforts to resolve the
          dispute amicably.
        </p>
        <h2>13. Changes to the Terms</h2>
        <p>
          We reserve the right to periodically update or change the Terms.
          Changes take effect upon publication on the Platform. We may notify
          users of changes by posting a new notice on the Platform or sending a
          message to the email address specified in the account. By continuing
          to use the Service after changes have taken effect, you confirm your
          agreement with the updated Terms.
        </p>
        <h2>14. Severability</h2>
        <p>
          If any provision of the Terms is held invalid or unenforceable, that
          provision will be limited or removed to the minimum extent necessary
          and the remaining provisions will remain in full force and effect.
        </p>
        <h2>15. Privacy Policy</h2>
        <p>
          Use of the Platform is also governed by our Privacy Policy. Your
          personal information is processed according to the Privacy Policy
          published on the Platform. Please read this Policy to understand how
          we collect, use and protect your data.
        </p>
        <h2>16. Contact Information</h2>
        <p>
          If you have any questions or comments regarding these Terms, please
          contact us at support@mintarion.com or via the feedback form on the
          Platform.
        </p>
      </div>
    </div>
  );
}

