import '../styles/home.scss';

const threads = [{
  name: "Renato",
  date: "01/03/2021",
  title: "Question 1?",
  desc: "Description 1",
  answers: 30
}, {
  name: "Leo",
  date: "02/03/2021",
  title: "Question 2?",
  desc: "Description 2",
  answers: 21
}, {
  name: "Deco",
  date: "03/03/2021",
  title: "Question 3?",
  desc: "Description 3",
  answers: 10
}]

export function Home() {
  return (
    <div className="main_container">
      {threads.map(item => (
        <div className="thread_container">
          <div className="thread_header">
            <span className="user">{item.name}</span>
            <span className="date">{item.date}</span>
          </div>
          <div className="thread_body">
            <span className="title">{item.title}</span>
            <span className="desc">{item.desc}</span>
          </div>
          <div className="thread_footer">
            <span className="answer">{item.answers} Respostas</span>
          </div>
        </div>
      ))}
    </div>
  );
}