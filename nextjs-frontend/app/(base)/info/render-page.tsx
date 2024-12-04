'use client';

import { motion } from "framer-motion";
import { fadeAnimations, createSlideAnimation } from "@/components/hoc/framer.config";
import { MY_TEAM, type TeamMemberTYPE } from "@/constants/team";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, Github, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";

export default function InfoPage() {
  return (
    <motion.div
      className="container py-12"
      variants={fadeAnimations.withScale}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        variants={createSlideAnimation({
          direction: "down",
          duration: 0.5,
          distance: 30
        })}
      >
        <h1 className="text-center text-gradient-purple-blue mb-12">Our Team</h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MY_TEAM.members.map((member: TeamMemberTYPE, index: number) => (
          <motion.div
            key={member.name}
            variants={createSlideAnimation({
              direction: "up",
              duration: 0.5,
              delay: index * 0.1,
              distance: 30
            })}
          >
            <Card className="hover-scale shadow-custom h-full">
              <CardHeader className="text-center">
                <div className="flex flex-col items-center gap-6">
                  <Avatar className="w-32 h-32">
                    <AvatarImage
                      src={member.avatar_img.src}
                      alt={member.name}
                      className="object-cover"
                    />
                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="w-40">
                    <Image
                      src={member.neon_name_img.src}
                      alt={`${member.name} neon`}
                      width={160}
                      height={40}
                      className="w-full rounded-lg"
                    />
                  </div>
                </div>
                <CardTitle className="text-xl mb-2">{member.name}</CardTitle>
                <Badge variant="secondary" className="mb-2">
                  {member.role}
                </Badge>
                <CardDescription className="text-gradient">
                  {member.major}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-muted-foreground mb-4 text-sm">
                  {member.desc}
                </p>

                <div className="space-y-2">
                  {member.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-primary" />
                      <span>{member.phone}</span>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {member.tech_stack.split(', ').map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex justify-center gap-4 mt-4">
                    <Github className="w-5 h-5 hover:text-primary cursor-pointer transition-colors" />
                    <Linkedin className="w-5 h-5 hover:text-primary cursor-pointer transition-colors" />
                    <Twitter className="w-5 h-5 hover:text-primary cursor-pointer transition-colors" />
                    <Mail className="w-5 h-5 hover:text-primary cursor-pointer transition-colors" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
