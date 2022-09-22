# frozen_string_literal: true

class Comment < ApplicationRecord
  ################################ ASSOCIATIONS ################################
  belongs_to :user
  belongs_to :commentable, polymorphic: true
  has_many :comment_replies, class_name: 'Comment', foreign_key: 'parent_id', dependent: :destroy
  belongs_to :parent, class_name: 'Comment', optional: true

  ################################## SETTINGS ##################################

  ################################### SCOPES ###################################

  ################################## DELEGATES #################################

  ################################# VALIDATIONS ################################

  ################################## CALLBACKS #################################
end
