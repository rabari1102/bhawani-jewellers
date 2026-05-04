interface Props {
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}
export default function SectionTitle({ title, subtitle, center = true, light = false }: Props) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      <div className={`inline-flex items-center gap-3 mb-3 ${ center ? 'justify-center' : '' }`}>
        <span className="h-px w-10 bg-gold-400"/>
        <span className={`text-xs tracking-widest uppercase ${ light ? 'text-gold-300' : 'text-gold-600' }`}>Bhawani Jewellers</span>
        <span className="h-px w-10 bg-gold-400"/>
      </div>
      <h2 className={`font-serif text-4xl font-light ${ light ? 'text-white' : 'text-jewel-dark' }`}>{title}</h2>
      {subtitle && <p className={`mt-3 text-sm max-w-xl ${ center ? 'mx-auto' : '' } ${ light ? 'text-gray-300' : 'text-gray-500' }`}>{subtitle}</p>}
    </div>
  );
}
