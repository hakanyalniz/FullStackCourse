// The below two are used for extending other interfaces
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBasePlusDesc extends CoursePartBase {
  description: string;
}

// The real interfaces
interface CoursePartBasic extends CoursePartBasePlusDesc {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartBasePlusDesc {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartRequirement extends CoursePartBasePlusDesc {
  requirements: string[];
  kind: "special";
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartRequirement;
