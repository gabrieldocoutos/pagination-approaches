import { User } from "../domain/user";
import { Card, Image, Text } from "@mantine/core";

interface CardProps {
	user: User;
	style?: React.CSSProperties;
}

export function UserCard({ user, style }: CardProps) {
	return (
		<Card
			style={style}
			shadow="sm"
			padding="xl"
			w={250}
			//   component="a"
			//   href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
			//   target="_blank"
		>
			<Card.Section>
				<Image src={user.avatar_url} h={160} alt="No way!" />
			</Card.Section>

			<Text fw={500} size="lg" mt="md">
				{user.name}
			</Text>

			<Text mt="xs" c="dimmed" size="sm">
				{user.email}
			</Text>

			<Text mt="xs" c="dimmed" size="sm">
				id: {user.id}
			</Text>
		</Card>
	);
}
