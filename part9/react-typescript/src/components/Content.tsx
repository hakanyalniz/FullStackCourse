import type { CoursePart } from "../types";

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: ContentProps) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Exercise Count</th>
            <th>Description / Extra Info</th>
          </tr>
        </thead>
        <tbody>
          {courseParts.map((coursePart) => {
            switch (coursePart.kind) {
              case "basic":
                return (
                  <tr>
                    <td>{coursePart.name}</td>
                    <td>{coursePart.exerciseCount}</td>
                    <td>{coursePart.description}</td>
                  </tr>
                );
              case "group":
                return (
                  <tr>
                    <td>{coursePart.name}</td>
                    <td>{coursePart.exerciseCount}</td>
                    <td>{coursePart.groupProjectCount}</td>
                  </tr>
                );

              case "background":
                return (
                  <tr>
                    <td>{coursePart.name}</td>
                    <td>{coursePart.exerciseCount}</td>
                    <td>{coursePart.description}</td>
                    <td>{coursePart.backgroundMaterial}</td>
                  </tr>
                );

              case "special":
                return (
                  <tr>
                    <td>{coursePart.name}</td>
                    <td>{coursePart.exerciseCount}</td>
                    <td>{coursePart.description}</td>
                    <td>{coursePart.requirements}</td>
                  </tr>
                );
              default:
                break;
            }
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Content;
