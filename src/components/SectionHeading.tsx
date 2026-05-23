import { motion } from "framer-motion";

interface Props {
  eyebrow: string;
  title: string;
  description?: string;
}

const SectionHeading = ({ eyebrow, title, description }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="text-center max-w-2xl mx-auto mb-14"
    >
      <span className="inline-block px-4 py-1 rounded-full glass-card text-xs font-semibold tracking-widest uppercase text-primary mb-4">
        {eyebrow}
      </span>
      <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
        <span className="gradient-text">{title}</span>
      </h2>
      {description && (
        <p className="text-muted-foreground text-lg">{description}</p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
