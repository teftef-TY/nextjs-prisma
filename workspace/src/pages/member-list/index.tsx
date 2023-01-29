import { User } from "@prisma/client";
import { GetServerSideProps } from "next";
import { FC } from "react";

interface Props {
  users: Array<User>;
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const host = context.req.headers.host || 'localhost:3000'
  const protocol = /^localhost/.test(host) ? 'http' : 'https' 
  const response = await fetch(`${protocol}://${host}/api/user/select`);
  const users: Array<User> = await response.json();
  return { props: { users } };
};

const MemberList: FC<Props> = ({ users }) => {
  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.name}>
            name: {user.name} age: {user.age}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemberList;
