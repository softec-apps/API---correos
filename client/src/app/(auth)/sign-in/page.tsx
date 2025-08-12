import { SigningView } from '@/modules/auth/components/view/Signing'
import { FooterPublic } from '@/shared/components/Footer-public'
import { HeaderPublic } from '@/shared/components/HeaderPublic'

export default function SignInPage() {
	return (
		<>
			<HeaderPublic />
			<SigningView />
			<FooterPublic />
		</>
	)
}
