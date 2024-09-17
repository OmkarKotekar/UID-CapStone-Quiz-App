import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h4 className="font-bold text-lg mb-2">Quiz App</h4>
            <p>Your go-to platform for interactive quizzes and learning.</p>
          </div>
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h4 className="font-bold text-lg mb-2">Useful Links</h4>
            <ul>
              <li>
                <Link href="/">
                  <div className="hover:underline">Home</div>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <div className="hover:underline">About Us</div>
                </Link>
              </li>
              <li>
                <Link href="/quizzes">
                  <div className="hover:underline">Quizzes</div>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <div className="hover:underline">Contact</div>
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h4 className="font-bold text-lg mb-2">Follow Us</h4>
            <div className="flex space-x-4">
              {/* Facebook */}
              <a href="#" className="hover:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0H1.325C.594 0 0 .593 0 1.324v21.352C0 23.407.593 24 1.325 24H12.82V14.708h-3.513v-3.61h3.513V8.413c0-3.484 2.134-5.387 5.254-5.387 1.494 0 2.778.111 3.15.161v3.652l-2.165.001c-1.697 0-2.026.806-2.026 1.987v2.604h4.051l-.528 3.609h-3.523V24h6.908c.731 0 1.325-.593 1.325-1.324V1.324C24 .593 23.407 0 22.675 0z" />
                </svg>
              </a>
              {/* YouTube */}
              <a href="#" className="hover:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184A2.997 2.997 0 0017.53 2.07C15.275 2 12 2 12 2s-3.275 0-5.53.07a2.997 2.997 0 00-2.085 1.114C3.686 4.428 3.5 6.222 3.5 8.502v3.024c0 2.28.186 4.073.885 5.317a2.997 2.997 0 002.085 1.114c2.255.07 5.53.07 5.53.07s3.275 0 5.53-.07a2.997 2.997 0 002.085-1.114c.698-1.244.885-3.037.885-5.317V8.502c0-2.28-.186-4.073-.885-5.317zM10.015 12.53V7.47L15.206 10l-5.191 2.53z" />
                </svg>
              </a>
              {/* GitHub */}
              <a href="#" className="hover:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .297C5.373.297 0 5.67 0 12.297c0 5.302 3.438 9.8 8.205 11.387.6.113.82-.26.82-.577v-2.173c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.087-.744.083-.729.083-.729 1.205.085 1.84 1.235 1.84 1.235 1.07 1.835 2.807 1.305 3.493.998.108-.776.418-1.305.76-1.605-2.665-.302-5.466-1.333-5.466-5.93 0-1.31.467-2.382 1.235-3.221-.124-.303-.536-1.522.117-3.176 0 0 1.008-.323 3.3 1.23a11.46 11.46 0 013.003-.404 11.47 11.47 0 013.003.404c2.292-1.553 3.3-1.23 3.3-1.23.653 1.654.242 2.873.118 3.176.77.839 1.236 1.91 1.236 3.221 0 4.61-2.803 5.624-5.473 5.92.43.37.814 1.1.814 2.22v3.293c0 .319.219.694.825.576C20.565 22.096 24 17.598 24 12.297 24 5.67 18.627.297 12 .297z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="hover:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.23 0H1.77C.79 0 0 .774 0 1.73v20.54C0 23.226.79 24 1.77 24h20.46c.98 0 1.77-.774 1.77-1.73V1.73C24 .774 23.21 0 22.23 0zM7.06 20.452H3.561V9.057H7.06v11.395zM5.309 7.606a2.046 2.046 0 01-2.06-2.045 2.047 2.047 0 112.06 2.045zm13.143 12.846h-3.497v-5.605c0-1.335-.026-3.055-1.857-3.055-1.86 0-2.145 1.45-2.145 2.953v5.707h-3.494V9.057h3.356v1.554h.048c.468-.884 1.612-1.81 3.32-1.81 3.551 0 4.204 2.338 4.204 5.376v6.276z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/4">
            <h4 className="font-bold text-lg mb-2">Contact Us</h4>
            <p>Email: support@quizapp.com</p>
            <p>Phone: +123 456 7890</p>
            <p>Address: TCET Mumbai, Kandivali (E)</p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p>&copy; {new Date().getFullYear()} Quiz App. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
