import { useState, useRef } from 'react'
import profileImage from './assets/GSW_033.JPG'
import spamVid from './assets/email_sapm_detection.mp4'
import fruitVid from './assets/fruit_and-vegetables_detection.mp4'
import nextstepVid from './assets/nextstepai.mp4'
import nextstepost from './assets/nexstepai.png'
import fruitpost from './assets/AgriculturalAi.png'
import emailpost from './assets/intlligent_email_classifier.png'
import resume from './src/assets/Resume AI engineer Zakaria Bellachia.pdf'
import '@fortawesome/fontawesome-free/css/all.min.css'

// ================= PROJECTS =================

function Projects({ title, video_src, description, skills, poster, github, demo }) {
  return (
    <div className="flex flex-col justify-between items-center text-center h-full w-full border border-slate-200 shadow-sm hover:shadow-md transition-shadow rounded-2xl bg-white p-6">

      <div className="flex flex-col items-center w-full gap-4">
        <h2 className="text-slate-900 font-bold text-xl">{title}</h2>

        <video
          src={video_src}
          poster={poster}
          controls
          preload="none"
          className="w-full aspect-video rounded-xl object-cover border border-slate-100"
        >
          Your browser does not support the video tag.
        </video>

        <p className="text-slate-600 text-sm leading-relaxed">{description}</p>

        <div className="flex flex-wrap gap-1.5 justify-center mt-2">
          {skills.map(s => (
            <span
              key={s}
              className="text-xs bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-md"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-3 mt-6 w-full justify-center">
        <a
          href={demo}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4 py-2 rounded-lg transition"
        >
          Live Demo
        </a>

        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white border border-slate-300 hover:border-slate-400 text-slate-700 font-medium text-sm px-4 py-2 rounded-lg transition"
        >
          GitHub
        </a>
      </div>

    </div>
  )
}


// ================= SKILLS =================

function Skills({ title, skill }) {
  return (
    <div className="flex flex-col text-center gap-3 py-4">
      <h3 className="text-xl font-bold text-slate-800">{title}</h3>
      <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
        {skill.map(s => (
          <span
            key={s}
            className="text-xs bg-blue-50 text-blue-800 font-semibold px-3 py-1.5 rounded-md border border-blue-100"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  )
}


// ================= SERVICE CARD =================

function ServiceCard({ icon, title, description, onSelectService }) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition">
      <div className="mb-4 text-3xl text-blue-600 bg-blue-50 w-14 h-14 rounded-full flex items-center justify-center">
        <i className={icon}></i>
      </div>

      <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-600 text-sm mb-6 leading-relaxed">{description}</p>

      <button
        type="button"
        onClick={() => onSelectService(title)}
        className="mt-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition w-full"
      >
        Ask for Service
      </button>
    </div>
  )
}


// ================= CONTACT FORM =================

function ContactForm({ selectedService, services }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: selectedService || '',
    message: ''
  })
  const [status, setStatus] = useState('idle')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setStatus('idle')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')

    try {
      const emailjs = (await import('@emailjs/browser')).default

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          service: formData.service,
          message: formData.message
        },
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
      )

      setStatus('sent')
      setFormData({ name: '', email: '', service: '', message: '' })
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
    }
  }

  return (
    <div className="max-w-xl mx-auto px-6">
      <h2 className="text-center text-slate-900 font-bold text-3xl mb-8">
        Contact Me
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm"
      >
        <div>
          <label
            htmlFor="contact-name"
            className="block text-xs font-semibold text-slate-600 uppercase mb-1"
          >
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="block text-xs font-semibold text-slate-600 uppercase mb-1"
          >
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="contact-service"
            className="block text-xs font-semibold text-slate-600 uppercase mb-1"
          >
            Service Required
          </label>
          <select
            id="contact-service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">Select a service</option>
            {services.map(s => (
              <option key={s.title} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="Other / Not Sure Yet">
              Other / Not Sure Yet
            </option>
          </select>
        </div>

        <div>
          <label
            htmlFor="contact-message"
            className="block text-xs font-semibold text-slate-600 uppercase mb-1"
          >
            Project Details
          </label>
          <textarea
            id="contact-message"
            name="message"
            placeholder="Tell me about your project..."
            value={formData.message}
            onChange={handleChange}
            rows={5}
            required
            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-4 py-3 rounded-lg transition mt-2"
        >
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </button>

        {status === 'sent' && (
          <p className="text-emerald-600 text-sm text-center font-medium">
            Thanks — your message was sent successfully!
          </p>
        )}

        {status === 'error' && (
          <p className="text-red-600 text-sm text-center font-medium">
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </div>
  )
}


// ================= MAIN APP =================

function App() {
  const [selectedService, setSelectedService] = useState('')
  const contactRef = useRef(null)

  const services = [
    {
      icon: 'fa-solid fa-robot',
      title: 'Custom AI Agents',
      description: 'Tailored LLM workflows and autonomous agent integrations.'
    },
    {
      icon: 'fa-solid fa-eye',
      title: 'Computer Vision APIs',
      description: 'Real-time object detection, image classification, and CV pipelines.'
    },
    {
      icon: 'fa-solid fa-brain',
      title: 'NLP & Text Classification',
      description: 'Automated language processing models and scalable text classification APIs.'
    }
  ]

  const handleSelectService = (title) => {
    setSelectedService(title)
    contactRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      {/* NAVIGATION */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <nav className="max-w-6xl mx-auto flex h-16 items-center justify-between px-6">
          <span className="font-bold text-lg text-slate-900">Zakaria Bellachia</span>
          <div className="flex gap-6 text-sm font-medium">
            <a href="#about" className="text-slate-600 hover:text-blue-600 transition">About</a>
            <a href="#projects" className="text-slate-600 hover:text-blue-600 transition">Projects</a>
            <a href="#skills" className="text-slate-600 hover:text-blue-600 transition">Skills</a>
            <a href="#services" className="text-slate-600 hover:text-blue-600 transition">Services</a>
            <a href="#contact" className="text-slate-600 hover:text-blue-600 transition">Contact</a>
          </div>
        </nav>
      </header>

      <main>
        {/* ABOUT SECTION */}
        <section id="about" className="bg-white border-b border-slate-200 py-20">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 px-6">
            <div className="flex flex-col gap-6 w-full md:w-1/2">
              <h1 className="text-slate-900 text-4xl md:text-5xl font-extrabold tracking-tight">
                Zakaria Bellachia
              </h1>
              <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
                I'm an AI Engineer helping startups automate their workflows with custom AI agents, NLP, and Computer Vision.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={resume}
                  download="Resume AI engineer Zakaria Bellachia.pdf"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition"
                >
                  Resume
                </a>
                <a
                  href="#projects"
                  className="bg-white border border-slate-300 hover:border-slate-400 text-slate-700 font-medium px-6 py-3 rounded-lg transition"
                >
                  My Projects
                </a>
                <a
                  href="#contact"
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium px-6 py-3 rounded-lg transition"
                >
                  Contact Me
                </a>
              </div>
            </div>

            <div className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 overflow-hidden rounded-full border-4 border-slate-100 shadow-lg bg-slate-100 shrink-0">
              <img
                src={profileImage}
                alt="Zakaria's profile picture"
                decoding="async"
                loading="eager"
                className="w-full h-full object-cover object-[50%_25%]"
              />
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-20 max-w-6xl mx-auto px-6">
          <h2 className="text-center text-3xl font-bold text-slate-900 mb-12">
            Featured Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            <Projects
              title="Email Spam Detection API"
              video_src={spamVid}
              poster={emailpost}
              description="An email spam classifier API built on the Enron dataset achieving 96% classification accuracy."
              skills={["scikit-learn", "NLTK", "FastAPI", "Streamlit", "Docker", "Docker-Compose", "Git"]}
              github="https://github.com/ZakariaBellachia/enron-email-spam-detection-fastapi-project"
              demo="https://enron-spam-frontend-1-0-0.onrender.com"
            />

            <Projects
              title="Fruit & Vegetables Classifier"
              video_src={fruitVid}
              poster={fruitpost}
              description="A computer vision fruit and vegetables classifier trained with transfer learning to 97% accuracy."
              skills={["TensorFlow", "Transfer Learning", "FastAPI", "Streamlit", "Docker", "Docker-Compose", "Git"]}
              github="https://github.com/ZakariaBellachia/fruit-and-vegetables-detector-api"
              demo="https://fruit-frontend-1-0.onrender.com"
            />

            <Projects
              title="NextStep AI"
              video_src={nextstepVid}
              poster={nextstepost}
              description="An autonomous AI agent that schedules tasks and plans routines directly from natural language input."
              skills={["OpenAI API", "FastAPI", "React.js", "Tailwind CSS", "Git"]}
              github="https://github.com/ZakariaBellachia/nextstep-ai"
              demo="https://nextstep-ai-1-qxtz.onrender.com/"
            />
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="py-20 bg-white border-y border-slate-200">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-center text-3xl font-bold text-slate-900 mb-12">
              Skills & Tech Stack
            </h2>

            <div className="space-y-8">
              <Skills title="Programming Languages" skill={["Python", "R", "HTML5", "CSS3", "JavaScript", "SQL"]} />
              <Skills title="AI & Machine Learning" skill={['NumPy', 'Pandas', 'Matplotlib', 'NLTK', 'spaCy', 'Seaborn', 'scikit-learn', 'PyTorch', 'TensorFlow', 'OpenAI API', 'Gemini API', 'Ollama API', 'Open WebUI', 'LangChain', 'Mem0', 'RAG', 'Transformers', 'Hugging Face', 'Diffusers']} />
              <Skills title="Frontend Development" skill={["React.js", "Tailwind CSS", "Streamlit"]} />
              <Skills title="Backend Development" skill={["FastAPI", "Pydantic", "Uvicorn"]} />
              <Skills title="DevOps & Tools" skill={["Docker", "Docker-Compose", "Git", "GitHub"]} />
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="py-20 max-w-6xl mx-auto px-6">
          <h2 className="text-center text-3xl font-bold text-slate-900 mb-12">Services</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((item, index) => (
              <ServiceCard
                key={index}
                icon={item.icon}
                title={item.title}
                description={item.description}
                onSelectService={handleSelectService}
              />
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" ref={contactRef} className="py-20 bg-slate-100 border-t border-slate-200">
          <ContactForm key={selectedService} selectedService={selectedService} services={services} />
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-white py-8 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400">© {new Date().getFullYear()} Zakaria Bellachia. All rights reserved.</p>

          <div className="flex gap-5 text-xl">
            <a
              href="https://www.linkedin.com/in/zakaria-bellachia-61a49522a"
              aria-label="LinkedIn profile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition"
            >
              <i className="fa-brands fa-linkedin"></i>
            </a>

            <a
              href="https://www.kaggle.com/zakariabellachia"
              aria-label="Kaggle profile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition"
            >
              <i className="fa-brands fa-kaggle"></i>
            </a>

            <a
              href="https://github.com/ZakariaBellachia"
              aria-label="GitHub profile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition"
            >
              <i className="fa-brands fa-github"></i>
            </a>

            <a
              href="https://www.upwork.com/freelancers/~01e835fa29f980855d?mp_source=share"
              aria-label="Upwork profile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition"
            >
              <i className="fa-brands fa-upwork"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
